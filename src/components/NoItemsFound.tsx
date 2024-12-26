"use client";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useRouter } from "next/navigation";
export const NoResultsFound = () => {
  const router = useRouter();
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <SearchOffIcon className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Products Found
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We couldn&apos;t find any products matching your criteria. Try adjusting
        your filters or search terms.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Clear All Filters
      </button>
    </div>
  );
};
