import { ProductGrid } from "@/components/ItemCard";
import { Item } from "@/interfaces/Item.interface";
import api from "@/lib/api";
import PaginationContainer from "@/components/Pagination";
import Filters from "@/components/Filters";
import Link from "next/link";

const pageSize = 10;

const fetchItems = async (
  page: number,
  minPrice: string,
  maxPrice: string,
  sort: string,
  text: string,
  category: string
): Promise<{ items: Item[]; count: number }> => {
  try {
    const response = await api.get(`/api/items`, {
      params: { page, pageSize, minPrice, maxPrice, sort, text, category },
    });
    return response.data.data;
  } catch (err: unknown) {
    if (process.env.NODE_ENV === "development") console.error(err);
    return { items: [], count: 0 };
  }
};

// const fetchCategory = async (category: string): Promise<ICategory | null> => {
//   try {
//     const response = await api.get(`/api/categories/${category}`, {
//       params: { category },
//     });
//     return response.data.data;
//   } catch (err: unknown) {
//     console.error(err);
//     return null;
//   }
// };

type Params = Promise<{ name: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const categoryName = params.name;

  const page = Number(searchParams.page) || 1;
  const minPrice = (searchParams.minPrice as string) || "";
  const maxPrice = (searchParams.maxPrice as string) || "";
  const sort = (searchParams.sort as string) || "";
  const text = (searchParams.text as string) || "";
  const [{ items, count }] = await Promise.all([
    fetchItems(page, minPrice, maxPrice, sort, text, categoryName),
  ]);

  const totalPages = Math.ceil(count / pageSize);
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="max-w-screen-xl mx-auto space-y-6">
        <Link href="/">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            Back to home page
          </span>
        </Link>

        <Filters
          itemsCount={count}
          sort={sort}
          selectedCategory={categoryName}
        />

        {/* Products Grid Section */}
        <div>
          <ProductGrid products={items} />
        </div>

        {/* Pagination Section */}
        {totalPages > 1 ? (
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-90 shadow-lg p-4 rounded-xl">
              <PaginationContainer
                totalPages={totalPages}
                currentPage={Number(page)}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
