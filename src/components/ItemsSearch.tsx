import { useRef, useEffect } from "react";
import { Item } from "@/interfaces/Item.interface";
import Image from "next/image";
import Link from "next/link";

interface ItemsSearchResultsProps {
  searchResults: Item[];
  setSearchQuery: (query: string) => void;
}

export default function ItemsSearchResults({
  searchResults,
  setSearchQuery,
}: ItemsSearchResultsProps) {
  const resultsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchQuery]);

  return (
    <ul ref={resultsRef} className="space-y-4">
      {searchResults.map((result) => {
        const hasDiscount = result.discount?.active;
        const discountedPrice = hasDiscount
          ? (
              result.price -
              (result.price * result.discount.value) / 100
            ).toFixed(2)
          : result.price.toFixed(2);

        return (
          <li key={result._id} className="cursor-pointer">
            <Link
              href={`/product/${result._id}`}
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <Image
                src={result.image}
                alt={result.name || "Item image"}
                width={64}
                height={64}
                className="object-cover rounded"
              />
              <div className="flex flex-col">
                <h6 className="font-bold text-lg">{result.name}</h6>
                <p className="text-sm text-gray-500">{result.category}</p>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {result.description}
                </p>
                <div className="mt-2 text-sm">
                  {hasDiscount && (
                    <span className="text-red-500">
                      Discount: {result.discount.value}%
                    </span>
                  )}
                  <span
                    className={`ml-2 ${
                      hasDiscount
                        ? "font-semibold text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Price: {discountedPrice} EGP
                  </span>
                  {hasDiscount && (
                    <span className="ml-2 line-through text-gray-500">
                      {result.price.toFixed(2)} EGP
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
