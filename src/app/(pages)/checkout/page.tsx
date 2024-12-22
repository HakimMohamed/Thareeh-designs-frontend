"use client";

import useCartStore from "@/stores/cart";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import CartItems from "@/components/CartItems";
import { useState } from "react";
import { CustomRadio } from "@/components/Radio";
import { CashOnDeliveryIcon, CreditCardIcon } from "@/components/icons/Icons";
import { useAuthStore } from "@/stores/auth";
import { OrdersService } from "@/services/order";
import { set } from "lodash";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IOrder } from "@/interfaces/order.interface";

export const countries = [
  {
    label: "Egypt",
    key: "egypt",
  },
];

export default function CartPage() {
  const { cart, isLoading } = useCartStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<{
    address: {
      city: string;
      country: string;
      name: { first: string; last: string };
      phone: string;
      postalCode: string;
      region: string;
      type: string;
      details: string;
    };
    paymentMethod: string;
    saveInfo: boolean;
  }>({
    // email: "",
    address: {
      city: "",
      country: "",
      name: { first: "", last: "" },
      phone: "",
      postalCode: "",
      region: "",
      type: "home",
      details: "",
    },
    paymentMethod: "cod",
    saveInfo: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    const { name, type, value, checked } = event.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      // Handle checkboxes correctly
      set(updatedFormData, name, type === "checkbox" ? checked : value);
      return updatedFormData;
    });
  };

  const router = useRouter();

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Form
        validationBehavior="native"
        className="w-full"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            toast.loading("Submitting...");

            const response = await OrdersService.createOrder(formData);

            const order: IOrder = response.data.data;

            toast.dismiss(); // Dismiss the loading toast
            toast.success("Order submitted successfully!");

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push(`/order-confirmation?id=${order._id}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
          } catch (err: any) {
            toast.error("Something went wrong!");
          }
        }}
      >
        <div className="container mx-auto px-4 py-8 max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Customer Details Form */}
            <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-1 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Information
              </h2>
              <Input
                isRequired
                name="email"
                label="Email Address"
                type="email"
                variant="bordered"
                isDisabled={!!user?.email}
                value={user?.email}
                disabled
                onChange={handleInputChange}
                required
                fullWidth
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  name="address.name.first"
                  label="First Name"
                  variant="bordered"
                  value={formData.address.name.first}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  isRequired
                  name="address.name.last"
                  label="Last Name"
                  variant="bordered"
                  value={formData.address.name.last}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Autocomplete
                  defaultItems={countries}
                  label="Country"
                  name="address.country"
                  autoComplete="country"
                  value={formData.address.country}
                  onInputChange={(key) => {
                    handleInputChange({
                      target: { name: "address.country", value: key },
                    });
                  }}
                  onSelectionChange={(key) =>
                    handleInputChange({
                      target: { name: "address.country", value: key },
                    })
                  }
                  fullWidth
                  required
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Input
                  isRequired
                  name="address.region"
                  label="Province"
                  variant="bordered"
                  value={formData.address.region}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  name="address.city"
                  label="City"
                  variant="bordered"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="address.postalCode"
                  label="Postal Code"
                  variant="bordered"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="address.details"
                  label="Address Details"
                  placeholder="House number, street name, etc."
                  variant="bordered"
                  value={formData.address.details}
                  onChange={handleInputChange}
                  isRequired
                  fullWidth
                />

                <Input
                  name="address.phone"
                  label="Phone Number"
                  placeholder="123-456-7890"
                  variant="bordered"
                  value={formData.address.phone}
                  onChange={handleInputChange}
                  isRequired
                  fullWidth
                />
              </div>

              <RadioGroup
                color="warning"
                label="Address type"
                name="address.type"
                orientation="horizontal"
                value={formData.address.type}
                onChange={handleInputChange}
              >
                <Radio description="All Day Delivery" value="home">
                  Home
                </Radio>
                <Radio description="Delivery Between 9am to 6pm" value="office">
                  Office
                </Radio>
              </RadioGroup>
              <Checkbox
                name="saveInfo"
                isSelected={formData.saveInfo}
                onChange={handleInputChange}
              >
                Save this information for next time
              </Checkbox>

              <RadioGroup
                className="flex gap-4 w-full lg:flex-wrap lg:w-full lg:gap-4 md:flex-nowrap" // flex-wrap for large screens, flex-nowrap for smaller screens
                orientation="horizontal"
                label="Payment Method"
                size="sm"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <CustomRadio
                  description="Pay in cash upon delivery."
                  value="cod"
                  image={CashOnDeliveryIcon({
                    className: "w-10 h-10 flex items-center justify-center",
                  })}
                >
                  Cash on Delivery
                </CustomRadio>
                <CustomRadio
                  description="Secure credit/debit card payment."
                  value="online"
                  image={CreditCardIcon({
                    className: "w-10 h-10 flex items-center justify-center",
                  })}
                >
                  Credit/Debit Card
                </CustomRadio>
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2 md:col-span-2 sm:col-span-6 col-span-1">
              <Card className="w-full h-full">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">Your Order</p>
                  </div>
                </CardHeader>
                <Divider className=" mx-auto" />
                <CardBody>
                  <div
                    className="cart-scrollbar px-1 max-h-[300px] overflow-y-auto"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0,0,0,0.2) transparent",
                    }}
                  >
                    {cart && cart.items && <CartItems items={cart.items} />}
                  </div>
                </CardBody>
                <Divider className="mx-auto" />

                <CardFooter>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between mb-6 gap-2">
                      <Input
                        size="sm"
                        type="text"
                        placeholder="Enter coupon code"
                        className="w-[80%]"
                      />
                      <Button size="sm" className="w-[20%]">
                        Apply
                      </Button>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>{cart?.originalPrice || "0"} EGP</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Discount</span>
                      <span className="text-red-500">
                        {cart?.originalPrice && cart?.price
                          ? `-${(cart.originalPrice - cart.price).toFixed(
                              2
                            )} EGP`
                          : ""}
                      </span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span>Delivery</span>
                      <span>{cart?.price ? "Free" : ""}</span>
                    </div>

                    <Divider className="mb-4 mt-4" />

                    <div className="flex justify-between mb-4">
                      <span>Total</span>
                      <span>{cart?.price} EGP</span>
                    </div>
                    <Button
                      fullWidth
                      color="primary"
                      className="mb-4"
                      type="submit"
                    >
                      Checkout
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
