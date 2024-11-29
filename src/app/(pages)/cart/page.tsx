"use client";

import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import useCartStore from "@/stores/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";

export default function CartPage() {
  const { cart, fetchCart } = useCartStore();
  const { updateQuantity, removeItemFromCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col px-4">
        <h2 className="text-2xl mb-6 text-center">Your cart is empty</h2>
        <Link href="/">
          <Button color="primary" size="lg" className="px-8">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* Cart Items Section */}
        <div className="px-1">
          <h2 className="text-2xl font-bold mb-6">
            Your Cart ({cart.items.length} Items)
          </h2>
          <div className="divide-y divide-gray-100">
            {cart.items.map((product) => (
              <div
                key={product._id}
                className="flex items-center p-5 hover:bg-gray-50 transition-colors"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${product._id}`}
                  className="flex-shrink-0 mr-5"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="object-cover rounded-lg"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold">
                      {product.name.length > 30
                        ? `${product.name.slice(0, 27)}...`
                        : product.name}
                    </h3>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      isIconOnly
                      onClick={() => removeItemFromCart(product._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-full">
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        isIconOnly
                        onClick={() =>
                          updateQuantity(product._id, product.quantity - 1)
                        }
                        disabled={product.quantity <= 1}
                      >
                        <RemoveIcon />
                      </Button>
                      <span className="px-4 text-base">{product.quantity}</span>
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        isIconOnly
                        onClick={() =>
                          updateQuantity(product._id, product.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.discount.active ? (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            {product.price.toFixed(2)} EGP
                          </span>
                          <span className="text-base font-semibold text-green-600">
                            {(
                              product.price *
                              (1 - product.discount.value / 100)
                            ).toFixed(2)}{" "}
                            EGP
                          </span>
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                            {product.discount.value}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-semibold">
                          {product.price.toFixed(2)} EGP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Order Summary Section */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{cart.originalPrice.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">
                -{(cart.originalPrice - cart.price).toFixed(2)} EGP
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{(cart.originalPrice - cart.price).toFixed(2)} EGP</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{cart.price.toFixed(2)} EGP</span>
            </div>
          </div>

          <Button color="primary" size="lg" fullWidth className="mt-6">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
