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

const categories = [
  {
    key: "anime",
    label: "Anime",
    imageUrl: "/images/0a59cc07cffcfa1ac780e8c46703df66.jpg",
  },
  {
    key: "nature",
    label: "Nature",
    imageUrl: "/images/ff24bfc6be30b9852e2371c399ffd2f9.jpg",
  },
  {
    key: "inspirational-quotes",
    label: "Inspirational Quotes",
    imageUrl: "/images/ff58ca370beea2593068660237f32747.jpg",
  },
  {
    key: "animals",
    label: "Animals",
    imageUrl: "/images/c783bcdb521446c394e53671c9698b9e.jpg",
  },
  {
    key: "space",
    label: "Space",
    imageUrl: "/images/f442ea7d7a8d29cdb5f157d5c5557602.jpg",
  },
  {
    key: "computers",
    label: "Computers",
    imageUrl: "/images/4b609c5e8cfafb16a2a0d614377a79dc.jpg",
  },
  {
    key: "cars",
    label: "Cars",
    imageUrl: "/images/f29148804399cede4c5f4d22b0f6d71c.jpg",
  },
];

export function CategoriesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

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
            key={category.key}
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <div className="p-1">
              <Card>
                <div
                  className="group relative flex flex-col items-center justify-center p-4 bg-cover bg-center h-40 transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                >
                  {/* Dark overlay with hover transition */}
                  <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
                  <div className="relative z-10">
                    <span className="mt-2 text-lg font-medium text-white">
                      {category.label}
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
