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
    <div className="space-y-4">
      {items.map((product) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row items-center bg-white shadow-sm rounded-lg p-4 transition-transform hover:scale-[1.01]"
        >
          {/* Product Image */}
          <Link href={`/product/${product._id}`} className="md:mr-4">
            <Image
              src={product.image}
              alt={product.name}
              width={120}
              height={120}
              className="object-cover rounded-lg"
            />
          </Link>

          {/* Product Details */}
          <div className="flex-grow w-full md:w-auto mt-3 md:mt-0">
            <div className="flex justify-between items-start">
              <Typography
                variant="body1"
                className="font-semibold text-gray-800"
              >
                {product.name}
              </Typography>
              <Button
                size="sm"
                variant="light"
                color="danger"
                isIconOnly
                onPress={() => removeItemFromCart(product._id)}
                className="hover:bg-red-100"
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </div>

            {/* Quantity and Price */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center border rounded-full mr-4">
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  isIconOnly
                  onPress={() =>
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
                  onPress={() =>
                    updateQuantity(product._id, product.quantity + 1)
                  }
                >
                  <AddIcon />
                </Button>
              </div>

              {/* Price Details */}
              <div className="text-right">
                {product.discount.active ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through text-gray-400">
                        {product.originalPrice.toFixed(2)} EGP
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {product.price.toFixed(2)} EGP
                      </span>
                    </div>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {product.discount.value}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-800">
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
