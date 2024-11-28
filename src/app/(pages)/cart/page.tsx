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
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Your Cart ({cart.items.length} Items)
          </h2>
          <div className="space-y-4">
            {cart.items.map((product) => {
              const { originalPrice, price } = product;
              console.log(product);
              return (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center border rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <Link
                    href={`/product/${product._id}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                      width={128}
                      height={128}
                    />
                  </Link>

                  <div className="flex-grow w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">
                        {product.name.length > 30
                          ? `${product.name.slice(0, 27)}...`
                          : product.name}
                      </h3>
                      <Button
                        size="sm"
                        variant="light"
                        color="danger"
                        className="p-2"
                        onClick={() => removeItemFromCart(product._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border rounded-full">
                        <Button
                          size="sm"
                          variant="light"
                          color="primary"
                          onClick={() =>
                            updateQuantity(product._id, product.quantity - 1)
                          }
                          disabled={product.quantity <= 1}
                          className="rounded-full"
                        >
                          <RemoveIcon />
                        </Button>
                        <span className="px-4">{product.quantity}</span>
                        <Button
                          size="sm"
                          variant="light"
                          color="primary"
                          onClick={() =>
                            updateQuantity(product._id, product.quantity + 1)
                          }
                          className="rounded-full"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        {price !== originalPrice ? (
                          <>
                            <span className="text-sm line-through text-gray-400">
                              {originalPrice.toFixed(2)} EGP
                            </span>
                            <span className="font-semibold text-green-600">
                              {price.toFixed(2)} EGP
                            </span>
                            {product?.discount?.active &&
                              product?.discount?.value > 0 && (
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                                  {product.discount.value.toFixed(0)}% OFF
                                </span>
                              )}
                          </>
                        ) : (
                          <span className="font-semibold">
                            {price.toFixed(2)} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
