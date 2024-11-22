import Filters from "../components/Filters";
import ProductGrid from "../components/ItemCard";
import { Item } from "../interfaces/Item.interface";
import api from "../lib/api";
import PaginationContainer from "../components/Pagination";

const pageSize = 10;

const fetchItems = async (
  page: number
): Promise<{ items: Item[]; count: number }> => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items`,
      {
        params: { page, pageSize },
      }
    );
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
  const { items, count } = await fetchItems(page);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="mb-4">
      <div className="mb-4">
        <h3 className="text-4xl font-bold">Stickers For You</h3>
      </div>
      <div className="w-full mb-4">
        <Filters />
      </div>

      <div className="mb-4">
        <ProductGrid products={items} />
      </div>

      <div className="flex justify-center">
        <div className="bg-white bg-opacity-90 shadow-lg p-4 rounded-lg">
          <PaginationContainer
            totalPages={totalPages}
            currentPage={Number(page)}
          />
        </div>
      </div>
    </div>
  );
}
