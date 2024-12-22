import ThankYouCard from "@/components/ThankYouCard";
import { OrdersService } from "@/services/order";
import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function ProductPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  console.log(searchParams);
  const order = await OrdersService.getOrderById(searchParams.id as string);

  return <ThankYouCard orderId={order._id} />;
}
