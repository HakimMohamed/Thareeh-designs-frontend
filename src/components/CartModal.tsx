"use client";

import { Button, Image } from "@nextui-org/react";
import { IFormattedCart } from "@/interfaces/cart.interface";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete"; // Import MUI Delete icon
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface CartProps {
  cart: IFormattedCart | null;
}

export default function CartModal({ cart }: CartProps) {
  const { updateQuantity, removeItemFromCart } = useCartStore();
  const router = useRouter();
  if (!cart) {
    return (
      <div>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <Button size="md" variant="flat" color="primary">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-64">
        <h4 className="text-lg font-semibold">Shopping Cart</h4>
        <p className="text-sm text-gray-500">
          You have {cart && cart.items.length} items in your cart.
        </p>
      </div>
      {cart && cart.items.length && (
        <div className="flex justify-center items-center flex-col">
          <ul role="list" className="divide-y divide-gray-200">
            {cart.items.slice(0, 3).map((product) => (
              <li key={product._id} className="flex items-center py-4">
                {/* Link only wraps the image now */}
                <div className="relative h-[150px] w-[150px]">
                  <Link
                    href={`/product/${product._id}`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="object-cover rounded-lg"
                    />
                  </Link>
                </div>
                <div className="ml-4 flex-1">
                  <p>
                    {product.name.length > 22
                      ? `${product.name.slice(0, 19)}...`
                      : product.name}
                  </p>
                  <div className="mt-1 flex justify-between">
                    <div className="flex items-center">
                      {/* Minus Button */}
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        onClick={() =>
                          updateQuantity(product._id, product.quantity - 1)
                        }
                        disabled={product.quantity <= 1} // Prevent decrementing below 1
                      >
                        <RemoveIcon />
                      </Button>
                      <p className="mx-2">{product.quantity}</p>
                      {/* Plus Button */}
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        onClick={() =>
                          updateQuantity(product._id, product.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </Button>
                    </div>
                    <p className="mt-1">
                      {product.price.toFixed(2) + " " + "EGP"}
                    </p>
                  </div>
                </div>
                <Button
                  size="md"
                  variant="light"
                  color="danger"
                  className="p-4 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the Link
                    removeItemFromCart(product._id); // Call remove item function
                  }}
                >
                  <DeleteIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-2 flex justify-between space-x-2 mb-5">
        <Button color="primary" size="sm" onClick={() => router.push("/cart")}>
          View Cart ({cart && cart.items.length})
        </Button>
        <div className="flex items-baseline gap-4">
          {cart.originalPrice !== cart.price ? (
            <>
              <span className="text-2xl font-light line-through text-gray-400">
                {cart.originalPrice.toFixed(2) + " " + "EGP"}
              </span>
              <span className="text-2xl font-medium text-green-600">
                {cart.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-light text-green-600">
              {cart.price.toFixed(2) + " " + "EGP"}
            </span>
          )}
        </div>
        <Button color="secondary" size="sm">
          Checkout
        </Button>
      </div>
    </div>
  );
}
