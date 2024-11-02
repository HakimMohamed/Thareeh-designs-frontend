"use client";
import { useState } from "react";
import { Drawer, Button } from "@mui/material";
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

const finishes: Selection[] = [
  { key: "matte", label: "Matte", icon: <IconPalette size={16} /> },
  { key: "glossy", label: "Glossy", icon: <IconPalette size={16} /> },
  { key: "transparent", label: "Transparent", icon: <IconPalette size={16} /> },
  { key: "holographic", label: "Holographic", icon: <IconPalette size={16} /> },
];

export default function Filters() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 w-full">
      {/* Button to open filters (visible on small screens) */}
      <Button
        variant="contained"
        onClick={toggleDrawer}
        className="md:hidden bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300"
        aria-label="Open Filters"
      >
        Open Filters
      </Button>

      {/* Filters displayed in horizontal order for larger screens */}
      <div className="hidden md:flex items-center space-x-4">
        <Select
          aria-label="Category selection"
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
          aria-label="Finish selection"
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
          aria-label="Price range selector"
          label="Price Range"
          step={50}
          minValue={0}
          maxValue={1000}
          defaultValue={[100, 500]}
          formatOptions={{ style: "currency", currency: "EGP" }}
          className="max-w-md"
        />
      </div>

      {/* Drawer for filters on small screens */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            height: "50%", // Adjust this value to increase the height of the drawer
            overflow: "visible", // Allow content to be fully visible
          },
        }}
      >
        <div className="flex flex-col p-4 space-y-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <Select
            aria-label="Category selection"
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
            aria-label="Finish selection"
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
            aria-label="Price range selector"
            label="Price Range"
            step={50}
            minValue={0}
            maxValue={1000}
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
          />
        </div>
      </Drawer>
    </div>
  );
}
