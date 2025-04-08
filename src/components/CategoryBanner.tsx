import React from "react";
import { ICategory } from "@/interfaces/category.interface";
import { Card } from "@nextui-org/react";

const CategoryBanner = ({ category }: { category: ICategory }) => {
  return (
    <div>
      <Card>
        <div
          className="group relative flex flex-col items-center justify-center p-4 bg-cover bg-center transition-transform duration-300 hover:scale-105 min-h-[200px]"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          {/* Dark overlay with hover transition */}
          <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
          <div className="relative z-10">
            <span className="mt-2 text-4xl font-medium text-white">
              {category.name
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategoryBanner;
