import React from "react";
import { Item } from "../interfaces/Item.interface";
import { Image, Link } from "@nextui-org/react";
import AddToCartButton from "./AddToCartButton";
import { NoResultsFound } from "./NoItemsFound";
import ItemQuantity from "./ItemQuantity";

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
  const discountedPrice =
    discount.active && discount.value > 0
      ? price * (1 - discount.value / 100)
      : price;

  return (
    <div className="group flex flex-col bg-white rounded-3xl shadow-[0_22px_24px_rgba(0,0,0,0.1),_0_10px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),_0_14px_20px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden h-full">
      <Link
        href={`/product/${_id}`}
        className="no-underline relative block aspect-square"
      >
        {image && (
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src={image}
              alt={name}
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {discount.active && discount.value > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                -{discount.value}%
              </div>
            )}
            {/* New Quantity Badge */}
            <ItemQuantity itemId={_id} />
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-4 space-y-3">
        <div className="flex-grow space-y-2">
          <Link
            href={`/product/${_id}`}
            className="block no-underline group-hover:text-blue-600 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {truncateText(name || "Untitled Product", 55)}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-2">
            {truncateText(description || "No description available", 100)}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {discountedPrice.toFixed(2)} EGP
            </span>
            {discount.active && discount.value > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {price.toFixed(2)} EGP
              </span>
            )}
          </div>

          <AddToCartButton
            itemId={_id}
            props="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export { ItemCard };

interface ProductGridProps {
  products: Item[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div key={product._id || index} className="h-full">
              <ItemCard {...product} />
            </div>
          ))}
        </div>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export { ProductGrid };
