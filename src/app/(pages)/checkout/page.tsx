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
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import CartItems from "@/components/CartItems";
import { useState } from "react";
import { CustomRadio } from "@/components/Radio";
import { CashOnDeliveryIcon, CreditCardIcon } from "@/components/icons/Icons";
import { useAuthStore } from "@/stores/auth";

export const countries = [
  {
    label: "Egypt",
    key: "egypt",
  },
];

export default function CartPage() {
  const { cart, isLoading } = useCartStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    addressDetails: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    paymentMethod: "cashOnDelivery",
    addressType: "home",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Customer Details Form */}
        <div className="col-span-4 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <Input
            isRequired
            name="email"
            label="Email Address"
            type="email"
            variant="bordered"
            isDisabled={!!user?.email}
            value={user?.email || formData.email}
            disabled={!!user?.email}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              isRequired
              name="firstName"
              label="First Name"
              variant="bordered"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <Input
              isRequired
              name="lastName"
              label="Last Name"
              variant="bordered"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Autocomplete
              defaultItems={countries}
              label="Country"
              name="country"
              autoComplete="new-country-selection"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>

            <Input
              isRequired
              name="province"
              label="Province"
              variant="bordered"
              value={formData.province}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              isRequired
              name="city"
              label="City"
              variant="bordered"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <Input
              isRequired
              name="postalCode"
              label="Postal Code"
              variant="bordered"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="addressDetails"
              label="Address Details"
              placeholder="House number, street name, etc."
              variant="bordered"
              value={formData.addressDetails}
              onChange={handleInputChange}
              isRequired
              fullWidth
            />

            <Input
              name="phoneNumber"
              label="Phone Number"
              placeholder="123-456-7890"
              variant="bordered"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              isRequired
              fullWidth
            />
          </div>

          <RadioGroup
            color="warning"
            label="Address type"
            name="addressType"
            orientation="horizontal"
            value={formData.addressType}
            onChange={handleInputChange}
          >
            <Radio description="All Day Delivery" value="home">
              Home
            </Radio>
            <Radio description="Delivery Between 9am to 6pm" value="office">
              Office
            </Radio>
          </RadioGroup>
          <Checkbox defaultSelected>
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
              value="cashOnDelivery"
              image={CashOnDeliveryIcon({
                className: "w-10 h-10 flex items-center justify-center",
              })}
            >
              Cash on Delivery
            </CustomRadio>
            <CustomRadio
              description="Secure credit/debit card payment."
              value="credit"
              image={CreditCardIcon({
                className: "w-10 h-10 flex items-center justify-center",
              })}
            >
              Credit/Debit Card
            </CustomRadio>
          </RadioGroup>
        </div>
        {/* Order Summary */}
        <div className="col-span-2 ">
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
                <style jsx>{`
                  .cart-scrollbar::-webkit-scrollbar {
                    width: 8px;
                  }
                  .cart-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 10px;
                  }
                  .cart-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                  }
                  .cart-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                  }
                `}</style>
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
                  <span>{cart?.originalPrice + " " + "EGP" || "0"}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Discount</span>
                  <span className="text-red-500">
                    {cart?.originalPrice && cart?.price
                      ? `-${(cart.originalPrice - cart.price).toFixed(2)} EGP`
                      : ""}
                  </span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Delivery</span>
                  <span>{cart?.price + " " + "EGP" ? "Free" : ""}</span>
                </div>

                <Divider className="mb-4 mt-4" />

                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span>{cart?.price} EGP</span>
                </div>
                <Button fullWidth color="primary" className="mb-4">
                  Checkout
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}