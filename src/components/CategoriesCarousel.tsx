"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@nextui-org/react";
import { ICategory } from "@/interfaces/category.interface";
import { useRouter } from "next/navigation";

export function CategoriesCarousel({
  categories,
}: {
  categories: ICategory[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const router = useRouter();

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="flex mb-4">
        {categories.map((category) => (
          <CarouselItem
            key={category._id}
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            onClick={() =>
              router.push(
                `/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`
              )
            }
          >
            <div className="p-1">
              <Card>
                <div
                  className="group relative flex flex-col items-center justify-center p-4 bg-cover bg-center h-40 transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  {/* Dark overlay with hover transition */}
                  <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
                  <div className="relative z-10">
                    <span className="mt-2 text-lg font-medium text-white">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
