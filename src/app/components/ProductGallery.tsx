import Image from "next/image";

interface ProductGalleryProps {
  image: string;
  name: string;
}

export const ProductGallery = ({ image, name }: ProductGalleryProps) => {
  return (
    <div className="relative h-full">
      <div className="relative h-[600px] overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          className="object-cover w-full h-full animate-fade-in"
          width={800}
          height={600}
          priority
        />
      </div>

      <div className="flex gap-4 mt-4">
        <Image
          src={image}
          alt={`${name} thumbnail`}
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
};
