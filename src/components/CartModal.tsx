"use client";

import { Button } from "@nextui-org/react";
import { IFormattedCart } from "@/interfaces/cart.interface";
import { useRouter } from "next/navigation";
import CartItems from "./CartItems";

interface CartProps {
  cart: IFormattedCart | null;
  setPopOverIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartModal({ cart, setPopOverIsOpen }: CartProps) {
  const router = useRouter();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 text-base">Your cart is empty</p>
      </div>
    );
  }

  const handleViewCart = () => {
    router.push("/cart");
    setPopOverIsOpen?.(false);
  };

  const handleCheckout = () => {
    setPopOverIsOpen?.(false);
    router.push("/checkout");
  };

  return (
    <div className="w-full max-w-lg">
      {/* Cart Header */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-base text-gray-600 font-medium">
          Your Cart ({cart.items.length} Items)
        </p>
      </div>

      {/* Cart Items with Modern Scrollbar */}
      <div
        className="cart-scrollbar px-1 max-h-[320px] overflow-y-auto"
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
        <CartItems items={cart.items} />
      </div>

      {/* Cart Summary and Actions */}
      <div className="p-6 border-t">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-baseline gap-3">
            {cart.originalPrice !== cart.price ? (
              <>
                <span className="text-base line-through text-gray-400">
                  {cart.originalPrice.toFixed(2)} EGP
                </span>
                <span className="text-xl font-bold text-green-600">
                  {cart.price.toFixed(2)} EGP
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-green-600">
                {cart.price.toFixed(2)} EGP
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            color="primary"
            variant="bordered"
            size="md"
            onPress={handleViewCart}
          >
            View Cart ({cart.items.length})
          </Button>
          <Button color="primary" size="md" onPress={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
