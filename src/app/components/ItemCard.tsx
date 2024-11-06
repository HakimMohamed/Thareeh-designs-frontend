import React from "react";
import Image from "next/image";

interface ProductItemProps {
  name: string;
  price: number;
  description: string;
  currency?: string;
  onSale?: boolean;
  discount?: number;
  imageUrl?: string;
}

const ItemCard: React.FC<ProductItemProps> = ({
  name,
  price = 0,
  description,
  currency = "$",
  onSale = false,
  discount = 0,
  imageUrl,
}) => {
  const calculateFinalPrice = (
    originalPrice: number,
    isOnSale: boolean,
    discountPercent: number
  ) => {
    if (typeof originalPrice !== "number" || isNaN(originalPrice)) return 0;
    if (
      !isOnSale ||
      typeof discountPercent !== "number" ||
      isNaN(discountPercent)
    )
      return originalPrice;
    return originalPrice - (originalPrice * discountPercent) / 100;
  };

  const formatPrice = (amount: number) => {
    return typeof amount === "number" && !isNaN(amount)
      ? amount.toFixed(2)
      : "0.00";
  };

  const finalPrice = calculateFinalPrice(price, onSale, discount);

  return (
    <div className="flex flex-col  bg-white rounded-lg shadow-lg overflow-hidden">
      {imageUrl && (
        <div className="w-full h-48 relative shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          {onSale && discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              {discount}% OFF
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-grow">
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-bold line-clamp-2 min-h-[3.5rem] text-gray-900">
            {name || "Untitled Product"}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2 after:content-['...'] after:inline">
            {description || "No description available"}
          </p>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {currency}
              {formatPrice(finalPrice)}
            </span>
            {onSale && discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {currency}
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-100 mt-auto">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  products: ProductItemProps[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
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
