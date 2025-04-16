"use client";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Selection {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

const options: Selection[] = [
  {
    key: "most-popular",
    label: "Most Popular",
  },
  {
    key: "price-low-to-high",
    label: "Price: Low to High",
  },
  {
    key: "price-high-to-low",
    label: "Price: High to Low",
  },
];

export default function Filters({
  itemsCount,
  sort,
  selectedCategory,
}: {
  itemsCount: number;
  minPrice?: string;
  selectedCategory?: string;
  maxPrice?: string;
  sort?: string;
}) {
  const [sortOption, setSortOption] = useState<string>(sort || "most-popular");
  const router = useRouter();

  const handleSortChange = (key: string) => {
    setSortOption(key);
    const params = new URLSearchParams(window.location.search);
    params.set("sort", key);
    if (selectedCategory) {
      router.push(`/categories/${selectedCategory}/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl">
              {selectedCategory
                ? selectedCategory
                    .replace(/-/g, " ")
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")
                : "Stickers"}
            </p>
            <p className="text-slate-500">({itemsCount})</p>
          </div>
          {/* Right: Slider and Sort grouped horizontally */}
          <Select
            size="sm"
            defaultSelectedKeys={[sortOption]}
            className="w-40"
            onChange={(event) => handleSortChange(event.target.value)}
          >
            {options.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
      </CardBody>
    </Card>
  );
}
