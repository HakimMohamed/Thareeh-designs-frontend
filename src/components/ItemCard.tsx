import React from "react";
import Image from "next/image";
import { Item } from "../interfaces/Item.interface";
import { Button, Link } from "@nextui-org/react";

const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

const ItemCard: React.FC<Item> = ({
  _id,
  name,
  price = 0,
  description,
  discount,
  image,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden shadow-gray-400/50 max-w-[300px] w-full">
      <Link href={`/product/${_id}`} className="no-underline">
        {image && (
          <div className="relative w-full h-48 overflow-hidden group">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out shadow-xl shadow-gray-600/50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            {discount.active && discount.value > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                {discount.value}% OFF
              </span>
            )}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow">
        <div className="p-4 flex-grow">
          {/* Product Name Link with Truncation */}
          <Link
            href={`/product/${_id}`}
            className="block no-underline text-xl font-bold text-gray-900"
          >
            {truncateText(name || "Untitled Product", 55)}
          </Link>

          {/* Product Description Link with Truncation */}
          <Link href={`/product/${_id}`} className="block no-underline mt-2">
            <p className="text-sm text-gray-600 line-clamp-3">
              {truncateText(description || "No description available", 100)}
            </p>
          </Link>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {price.toFixed(2)}
              {" EGP"}
            </span>
            {discount.active && discount.value > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {price.toFixed(2)}
                {" EGP"}
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-100 mt-auto">
          <Button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  products: Item[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="max-w-screen-xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products &&
          products.map((product, index) => (
            <div key={index} className="h-full">
              <ItemCard {...product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;