"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import useCartStore from "@/stores/cart";
import CartItems from "@/components/CartItems";
import OrderSummary from "@/components/OrderSummary";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function CartPage() {
  const { cart, isLoading } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Loading Your Cart...</h2>
          <LoadingSkeleton />
        </>
      ) : !cart || cart.items.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen flex-col px-4">
          <h2 className="text-2xl mb-6 text-center">Your cart is empty</h2>
          <Link href="/">
            <Button color="primary" size="lg" className="px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            <CartItems items={cart.items} />
            <OrderSummary
              originalPrice={cart.originalPrice}
              discount={cart.originalPrice - cart.price}
              totalPrice={cart.price}
            />
          </div>
          <FeaturedProducts />
        </div>
      )}
    </div>
  );
}
