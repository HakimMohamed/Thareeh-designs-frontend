import Filters from "../components/Filters";
import { Item } from "../interfaces/Item.interface";
import api from "../lib/api";
import PaginationContainer from "../components/Pagination";
import { ProductGrid } from "@/components/ItemCard";
import { CategoriesCarousel } from "@/components/CategoriesCarousel";
import { ICategory } from "@/interfaces/category.interface";

const pageSize = 10;

const fetchItems = async (
  page: number,
  minPrice: string,
  maxPrice: string,
  sort: string,
  text: string
): Promise<{ items: Item[]; count: number }> => {
  try {
    const response = await api.get(`/api/items`, {
      params: { page, pageSize, minPrice, maxPrice, sort, text },
    });
    return response.data.data;
  } catch (err: unknown) {
    if (process.env.NODE_ENV === "development") console.error(err);
    return { items: [], count: 0 };
  }
};

const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await api.get(`/api/categories`);
    return response.data.data;
  } catch (err: unknown) {
    console.error(err);
    return [];
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
  const minPrice = (searchParams.minPrice as string) || "";
  const maxPrice = (searchParams.maxPrice as string) || "";
  const sort = (searchParams.sort as string) || "";
  const text = (searchParams.text as string) || "";
  const [{ items, count }, categories] = await Promise.all([
    fetchItems(page, minPrice, maxPrice, sort, text),
    fetchCategories(),
  ]);

  const totalPages = Math.ceil(count / pageSize);
  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Filters directly without card wrapping */}
        <div className="flex justify-center">
          <CategoriesCarousel categories={categories} />
        </div>
        <Filters itemsCount={count} sort={sort} />

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
