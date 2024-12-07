import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCartStore from "@/stores/cart";
import { IFormattedCart } from "@/interfaces/cart.interface";
import { Typography } from "@mui/material";

export default function CartItems({
  items,
}: {
  items: IFormattedCart["items"];
}) {
  const { updateQuantity, removeItemFromCart } = useCartStore();

  return (
    <div className="divide-y divide-gray-100">
      {items.map((product) => (
        <div
          key={product._id}
          className="flex items-center p-5 hover:bg-gray-50 transition-colors"
        >
          {/* Product Image */}
          <Link href={`/product/${product._id}`} className="flex-shrink-0 mr-5">
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
              <Typography className="text-base font-semibold" fontWeight="bold">
                {product.name}
              </Typography>
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
                  <div className="flex flex-col items-start">
                    <div className="flex gap-2 items-center">
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
                    </div>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded mt-1">
                      {product.discount.value}% OFF
                    </span>
                  </div>
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
  );
}
