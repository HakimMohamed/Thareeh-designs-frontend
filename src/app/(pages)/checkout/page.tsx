"use client";

import useCartStore from "@/stores/cart";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

export default function CartPage() {
  const { cart, isLoading } = useCartStore();

  console.log(cart);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-[280px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Your Order</p>
          </div>
        </CardHeader>
        <Divider className="w-[85%] mx-auto" />
        <CardBody>
          <p>cart items here.</p>
        </CardBody>
        <Divider className="w-[85%] mx-auto" />

        <CardFooter>
          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-6 gap-4">
              <Input size="sm" type="text" placeholder="Coupon code" />
              <Button size="sm">Apply</Button>
            </div>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{cart?.originalPrice || "0"}</span>
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
              <span>{cart?.price ? "Free" : ""}</span>
            </div>

            <Divider className="w-[85%] mx-auto mb-4 mt-4" />

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>{cart?.price}</span>
            </div>
            <Button fullWidth color="primary">
              Checkout
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
