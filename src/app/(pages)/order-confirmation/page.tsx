import ThankYouCard from "@/components/ThankYouCard";
import { OrdersService } from "@/services/order";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ProductPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const order = await OrdersService.getOrderById(searchParams.id as string);

  return <ThankYouCard orderId={order._id} />;
}
