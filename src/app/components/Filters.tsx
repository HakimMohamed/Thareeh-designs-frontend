import { Select, SelectedItems, SelectItem, Slider } from "@nextui-org/react";
import {
  IconPalette,
  IconMovie,
  IconMusic,
  IconUserStar,
  IconPhoto,
  IconGlobe,
} from "@tabler/icons-react";

interface Selection {
  key: string;
  label: string;
  icon: React.ReactNode; // Add an icon property
}

const categories: Selection[] = [
  { key: "memes", label: "Memes", icon: <IconUserStar size={16} /> },
  { key: "anime", label: "Anime", icon: <IconPhoto size={16} /> },
  { key: "sports", label: "Sports", icon: <IconGlobe size={16} /> },
  { key: "movies", label: "Movies", icon: <IconMovie size={16} /> },
  { key: "music", label: "Music", icon: <IconMusic size={16} /> },
  { key: "random", label: "Random", icon: <IconPalette size={16} /> },
];

const finishes: Selection[] = [
  { key: "matte", label: "Matte", icon: <IconPalette size={16} /> },
  { key: "glossy", label: "Glossy", icon: <IconPalette size={16} /> },
  { key: "transparent", label: "Transparent", icon: <IconPalette size={16} /> },
  { key: "holographic", label: "Holographic", icon: <IconPalette size={16} /> },
];

export default function Filters() {
  return (
    <div className="flex flex-col md:flex-row md:space-x-4 w-full">
      <Select
        items={categories}
        placeholder="Select a category"
        labelPlacement="outside"
        classNames={{
          base: "max-w-[200px]",
          trigger: "h-12",
        }}
        renderValue={(items: SelectedItems<Selection>) => {
          return items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              {item.data?.icon}
              <div className="flex flex-col">
                <span>{item?.data?.label || ""}</span>
              </div>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem key={item.key} textValue={item.label}>
            <div className="flex gap-2 items-center">
              {item?.icon}
              <div className="flex flex-col">
                <span className="text-small">{item.label}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>

      <Select
        items={finishes}
        placeholder="Select a finish"
        labelPlacement="outside"
        classNames={{
          base: "max-w-[200px]",
          trigger: "h-12",
        }}
        renderValue={(items: SelectedItems<Selection>) => {
          return items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              {item.data?.icon}
              <div className="flex flex-col">
                <span>{item?.data?.label || ""}</span>
              </div>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem key={item.key} textValue={item.label}>
            <div className="flex gap-2 items-center">
              {item?.icon}
              <div className="flex flex-col">
                <span className="text-small">{item.label}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Slider
        label="Price Range"
        step={50}
        minValue={0}
        maxValue={1000}
        defaultValue={[100, 500]}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="max-w-md"
      />
    </div>
  );
}
