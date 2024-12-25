"use client";
import {
  IconPalette,
  IconMovie,
  IconMusic,
  IconUserStar,
  IconPhoto,
  IconGlobe,
} from "@tabler/icons-react";
import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";

interface Selection {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const categories: Selection[] = [
  { key: "memes", label: "Memes", icon: <IconUserStar size={16} /> },
  { key: "anime", label: "Anime", icon: <IconPhoto size={16} /> },
  { key: "sports", label: "Sports", icon: <IconGlobe size={16} /> },
  { key: "movies", label: "Movies", icon: <IconMovie size={16} /> },
  { key: "music", label: "Music", icon: <IconMusic size={16} /> },
  { key: "random", label: "Random", icon: <IconPalette size={16} /> },
];

export default function Filters({ itemsCount }: { itemsCount: number }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleApply = () => {
    console.log("Selected Categories: ", selectedCategories);
    // Perform filtering or any other action based on selected categories
  };

  const handleCancel = () => {
    setSelectedCategories([]); // Reset selections
  };

  const chips = categories.map((category) => (
    <Button
      key={category.key}
      startContent={category.icon}
      color="default"
      variant={selectedCategories.includes(category.key) ? "solid" : "bordered"}
      size="sm"
      className="w-full"
      onPress={() => handleSelect(category.key)}
    >
      {category.label}
    </Button>
  ));

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          {/* Stickers title and count on the left */}
          <div className="flex items-center space-x-2">
            <p className="font-bold">Stickers</p>
            <p className="text-slate-500">({itemsCount})</p>
          </div>

          {/* Filter dropdown on the right */}
          <Popover color="default" placement="bottom">
            <PopoverTrigger>
              <Button color="default" variant="flat" size="sm">
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid grid-cols-3 gap-2 p-2">{chips}</div>

              {/* Divider */}
              <Divider className="my-2" />

              {/* Action Buttons */}
              <div className="justify-content space-x-2 p-2">
                <Button color="default" onPress={handleCancel} size="sm">
                  Cancel
                </Button>
                <Button color="primary" onPress={handleApply} size="sm">
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardBody>
    </Card>
  );
}
