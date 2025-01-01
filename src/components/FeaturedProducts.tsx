import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Skeleton } from "@nextui-org/react";
import { ProductGrid } from "./ItemCard";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get(`/api/items/featured`, {
          params: { pageSize: 5 },
        });
        setFeaturedProducts(res.data.data);
      } catch (error) {
        console.error(error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-light mb-8">Add ons for you</h2>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="rounded-lg"
              style={{ height: "200px" }}
            />
          ))}
        </div>
      ) : (
        <ProductGrid products={featuredProducts} />
      )}
    </div>
  );
}
