import { Item } from "@/app/interfaces/Item.interface";

interface ProductDetailsProps {
  product: Item;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const discountedPrice = product.discount.active
    ? product.price - (product.price * product.discount.value) / 100
    : product.price;

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-light mb-2">{product.name}</h1>
        <div className="flex items-center gap-4">
          {product.discount.active ? (
            <>
              <span className="text-2xl font-light line-through text-gray-400">
                ${product.price}
              </span>
              <span className="text-2xl font-medium text-red-600">
                ${discountedPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-light">${product.price}</span>
          )}
        </div>
      </div>

      <div className="prose prose-gray dark:prose-invert">
        <p className="text-lg leading-relaxed">{product.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="w-14 h-14 rounded-full border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center text-sm"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Select Color</h3>
          <div className="flex gap-3">
            {["bg-black", "bg-gray-200", "bg-blue-600", "bg-red-600"].map(
              (color, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full ${color} hover:ring-2 ring-offset-2 ring-black dark:ring-white transition-all`}
                />
              )
            )}
          </div>
        </div>
      </div>

      <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors text-sm font-medium">
        Add to Cart
      </button>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h3 className="text-sm font-medium mb-4">Product Details</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Premium materials</li>
          <li>• Ethically manufactured</li>
          <li>• Free shipping on orders over $100</li>
          <li>• 30-day return policy</li>
        </ul>
      </div>
    </div>
  );
};
