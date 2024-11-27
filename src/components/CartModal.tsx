"use client";

import { Button, Image } from "@nextui-org/react";
import { IFormattedCart } from "@/interfaces/cart.interface";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete"; // Import MUI Delete icon
import { useRouter } from "next/navigation";

interface CartProps {
  cart: IFormattedCart | null;
}

export default function CartModal({ cart }: CartProps) {
  const router = useRouter();
  if (!cart) {
    return (
      <>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <Button size="md" variant="flat" color="primary">
          Close
        </Button>
      </>
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
                <Link
                  href={`/product/${product._id}`}
                  className="flex flex-1 items-center cursor-pointer rounded-md p-2"
                >
                  <div className="relative h-[150px] rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p>
                      {product.name.length > 22
                        ? `${product.name.slice(0, 19)}...`
                        : product.name}
                    </p>
                    <div className="mt-1 flex justify-between">
                      <p color="textSecondary">Qty: {product.quantity}</p>
                      <p>{product.price.toFixed(2) + " " + "EGP"}</p>
                    </div>
                  </div>
                </Link>
                <Button
                  size="md"
                  variant="light"
                  color="danger"
                  className="p-4 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the Link
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
        <Button color="secondary" size="sm">
          Checkout
        </Button>
      </div>
    </div>
  );
}
