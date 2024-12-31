import { Item } from "@/interfaces/Item.interface";
import { ItemCard } from "./ItemCard";

export default function ItemsSearchResults({
  searchResults,
}: {
  searchResults: Item[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {searchResults.map((product, index) => (
        <div key={product._id || index} className="h-full">
          <ItemCard {...product} />
        </div>
      ))}
    </div>
  );
}
