"use client";
import {
  IconPalette,
  IconUserStar,
  IconPhoto,
  IconGlobe,
} from "@tabler/icons-react";
import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Slider from "@mui/material/Slider";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Selection {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

const categories: Selection[] = [
  { key: "anime", label: "Anime", icon: <IconPhoto size={16} /> },
  { key: "nature", label: "Nature", icon: <IconGlobe size={16} /> },
  {
    key: "inspirational-quotes",
    label: "Inspirational Quotes",
    icon: <IconUserStar size={16} />,
  },
  { key: "animals", label: "Animals", icon: <IconPalette size={16} /> },
];

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
  selectedCats,
  minPrice,
  maxPrice,
  sort,
}: {
  itemsCount: number;
  selectedCats?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCats?.split(",") || []
  );
  const [tempSelectedCategories, setTempSelectedCategories] = useState<
    string[]
  >(selectedCats?.split(",") || []);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(minPrice) || 0,
    Number(maxPrice) || 1000,
  ]);
  const [sortOption, setSortOption] = useState<string>(sort || "most-popular");
  const router = useRouter();

  const handleSelect = (key: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleApply = () => {
    setSelectedCategories(tempSelectedCategories);
    setPopoverOpen(false);
    const [minPrice, maxPrice] = priceRange;
    router.push(
      `/?categories=${tempSelectedCategories.join(
        ","
      )}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sortOption}`
    );
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories);
    setPriceRange([0, 1000]); // Reset to full range
    setPopoverOpen(false);
  };

  const handleSortChange = (key: string) => {
    setSortOption(key);
    const params = new URLSearchParams(window.location.search);
    params.set("sort", key);
    router.push(`/?${params.toString()}`);
  };

  const chips = categories.map((category) => {
    const isSelected = tempSelectedCategories.includes(category.key);
    return (
      <Button
        key={category.key}
        startContent={category.icon}
        color={isSelected ? "primary" : "default"}
        variant={isSelected ? "solid" : "bordered"}
        size="sm"
        className="w-full"
        onPress={() => handleSelect(category.key)}
      >
        {category.label}
      </Button>
    );
  });

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          {/* Stickers title and count */}
          <div className="flex items-center">
            <p className="font-bold">Stickers</p>
            <p className="text-slate-500">({itemsCount})</p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Popover Trigger */}
            <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger>
                <Button
                  className="w-full sm:w-[222px] sm:min-w-[200px] min-w-[200px]"
                  startContent={<TuneIcon />}
                  size="sm"
                >
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-[300px]">
                <div className="flex flex-col gap-6">
                  <p className="font-semibold">Categories</p>
                  <div className="grid grid-cols-1 gap-2">{chips}</div>

                  {/* Price Range Slider */}
                  <div className="flex flex-col gap-4 mt-4">
                    <p className="font-semibold mb-4">Price Range</p>
                    <Slider
                      value={priceRange}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      step={10}
                      marks={[
                        { value: 0, label: "$0" },
                        { value: 1000, label: "$1000" },
                      ]}
                    />
                  </div>

                  {/* Apply and Cancel Buttons */}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      color="default"
                      onPress={handleCancel}
                      size="sm"
                      variant="light"
                    >
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handleApply} size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Sort Options */}
            <Select
              size="sm"
              defaultSelectedKeys={[sortOption]}
              className="w-full sm:w-[222px] sm:min-w-[200px] min-w-[200px]"
              onChange={(event) => handleSortChange(event.target.value)}
            >
              {options.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
