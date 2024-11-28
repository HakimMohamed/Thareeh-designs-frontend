"use client";

import { Button, Image } from "@nextui-org/react";
import { IFormattedCart } from "@/interfaces/cart.interface";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartProps {
  cart: IFormattedCart | null;
  setPopOverIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartModal({ cart, setPopOverIsOpen }: CartProps) {
  const { updateQuantity, removeItemFromCart } = useCartStore();
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
        <div className="divide-y divide-gray-100">
          {cart.items.map((product) => (
            <div
              key={product._id}
              className="flex items-center p-5 hover:bg-gray-50 transition-colors"
            >
              {/* Product Image */}
              <Link
                href={`/product/${product._id}`}
                onClick={() => setPopOverIsOpen && setPopOverIsOpen(false)}
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
            onClick={handleViewCart}
          >
            View Cart ({cart.items.length})
          </Button>
          <Button color="primary" size="md" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
