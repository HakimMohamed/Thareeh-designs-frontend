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
import CartItems from "@/components/CartItems";

export default function CartPage() {
  const { cart, isLoading } = useCartStore();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-[500px] max-h-2000">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Your Order</p>
          </div>
        </CardHeader>
        <Divider className="w-[85%] mx-auto mb-4" />
        <CardBody>
          <div
            className="cart-scrollbar px-1 max-h-[500px] overflow-y-auto"
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
        <Divider className="w-[85%] mx-auto  mb-4" />

        <CardFooter>
          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-6 gap-4">
              <Input
                size="sm"
                type="text"
                placeholder="Coupon code"
                className="w-[60%]"
              />
              <Button size="sm" className="w-[40%]">
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

            <Divider className="w-[85%] mx-auto mb-4 mt-4" />

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>{cart?.price} EGP</span>
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
