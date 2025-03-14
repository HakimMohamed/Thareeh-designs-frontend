"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;
  route?: string;
}

const PaginationContainer = ({
  totalPages,
  currentPage,
  route = "/",
}: Props) => {
  const router = useRouter();
  if (totalPages == 1) return null;

  return (
    <Pagination
      total={totalPages}
      initialPage={1}
      variant="faded"
      page={currentPage}
      onChange={(page) => router.push(`${route}?page=${page}`)}
      getItemAriaLabel={(page) => `Go to page ${page}`}
    />
  );
};

export default PaginationContainer;
