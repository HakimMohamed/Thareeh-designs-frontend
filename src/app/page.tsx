import Filters from "../components/Filters";
import ProductGrid from "../components/ItemCard";
import { Item } from "../interfaces/Item.interface";
import api from "../lib/api";
import PaginationContainer from "../components/Pagination";

const pageSize = 10;

const fetchItems = async (
  page: number,
  categories: string,
  minPrice: string,
  maxPrice: string,
  sort: string,
  text: string
): Promise<{ items: Item[]; count: number }> => {
  try {
    const response = await api.get(`/api/items`, {
      params: { page, pageSize, categories, minPrice, maxPrice, sort, text },
    });
    return response.data.data;
  } catch (err: unknown) {
    if (process.env.NODE_ENV === "development") console.error(err);
    return { items: [], count: 0 };
  }
};

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const categories = (searchParams.categories as string) || "";
  const minPrice = (searchParams.minPrice as string) || "";
  const maxPrice = (searchParams.maxPrice as string) || "";
  const sort = (searchParams.sort as string) || "";
  const text = (searchParams.text as string) || "";
  const { items, count } = await fetchItems(
    page,
    categories,
    minPrice,
    maxPrice,
    sort,
    text
  );

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Filters directly without card wrapping */}
        <Filters
          itemsCount={count}
          selectedCats={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sort={sort}
        />

        {/* Products Grid Section */}
        <div>
          <ProductGrid products={items} />
        </div>

        {/* Pagination Section */}
        {count > 0 && (
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-90 shadow-lg p-4 rounded-xl">
              <PaginationContainer
                totalPages={totalPages}
                currentPage={Number(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
