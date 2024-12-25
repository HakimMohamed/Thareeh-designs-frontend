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
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
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

export default function Filters({ itemsCount }: { itemsCount: number }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Applied filters
  const [tempSelectedCategories, setTempSelectedCategories] = useState<
    string[]
  >([]); // Temporary selections
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (key: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleApply = () => {
    setSelectedCategories(tempSelectedCategories);
    setPopoverOpen(false);
    router.push(`/?categories=${tempSelectedCategories.join(",")}`);
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories); // Reset to currently applied filters
    setPopoverOpen(false);
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
              <PopoverContent className="p-4 w-[250px]">
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-lg">Filter Categories</p>
                  <div className="grid grid-cols-1 gap-2">{chips}</div>
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
              defaultSelectedKeys={["most-popular"]}
              className="w-full sm:w-[222px] sm:min-w-[200px] min-w-[200px]"
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
