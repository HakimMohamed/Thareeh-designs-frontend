import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function OrderSummary({
  originalPrice,
  discount,
  totalPrice,
}: {
  originalPrice: number;
  discount: number;
  totalPrice: number;
}) {
  const router = useRouter();
  return (
    <div className="bg-gray-50 rounded-lg p-6 h-fit">
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{originalPrice.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-red-500">-{discount.toFixed(2)} EGP</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} EGP</span>
        </div>
      </div>
      <Button
        color="primary"
        size="lg"
        fullWidth
        className="mt-6"
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
