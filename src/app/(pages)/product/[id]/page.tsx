import { Item } from "@/interfaces/Item.interface";
import api from "@/lib/api";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProductGrid from "@/components/ItemCard";
import { Button } from "@nextui-org/react";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string): Promise<Item | null> {
  try {
    const res = await api.get(`/api/items/item?id=${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getFeaturedProducts(id: string): Promise<Item[]> {
  try {
    const res = await api.get(`/api/items/featured?excludeId=${id}`, {
      params: { pageSize: 10 },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const product = await getProduct(params.id);
  const featuredProducts = await getFeaturedProducts(params.id);

  if (!product) {
    redirect("/not-found");
  }

  const discountedPrice = product.discount.active
    ? product.price - (product.price * product.discount.value) / 100
    : product.price;

  return (
    <main className="min-h-screen  dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-600/50 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h2 className="font-bold mb-2">{product.name}</h2>

              <div className="flex items-baseline gap-4">
                {product.discount.active && product.discount.value > 0 ? (
                  <>
                    <span className="text-2xl font-light line-through text-gray-400">
                      {product.price.toFixed(2) + " " + "EGP"}
                    </span>
                    <span className="text-2xl font-medium text-green-600">
                      {discountedPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-light text-green-600">
                    {product.price.toFixed(2) + " " + "EGP"}
                  </span>
                )}
              </div>

              <div className="prose prose-gray dark:prose-invert">
                <p className="text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <Button
                        key={size}
                        className="w-14 h-14 rounded-full border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center text-sm"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <AddToCartButton
                itemId={product._id}
                props="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
              />

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-sm font-medium mb-4">Product Details</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Premium materials</li>
                  <li>• Ethically manufactured</li>
                  <li>• Free shipping on orders over $100</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-light mb-8">You May Also Like</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}
