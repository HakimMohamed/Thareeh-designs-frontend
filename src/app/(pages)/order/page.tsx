"use client";
import React, { useState, useEffect } from "react";
import { Clock, Package, MapPin, CreditCard, Loader2 } from "lucide-react";
import { OrdersService } from "@/services/order";
import { Alert, Card, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";
import { IOrder } from "@/interfaces/order.interface";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const OrderDetailsPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("Order ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await OrdersService.getOrderById(orderId);
        setOrderDetails(data);
        setError(null);
      } catch (err) {
        setError("Failed to load order details. Please try again later.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
    }).format(price);
  };

  if (!orderId) {
    return (
      <Alert className="max-w-4xl mx-auto mt-8">
        No order ID provided in the URL.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-4xl mx-auto mt-8">
        {error}
      </Alert>
    );
  }

  if (!orderDetails) {
    return <Alert className="max-w-4xl mx-auto mt-8">Order not found.</Alert>;
  }

  const calculateItemDiscount = (item: IOrder["items"][0]) => {
    const totalBeforeDiscount = orderDetails.items.reduce(
      (sum, i) => sum + i.price,
      0
    );
    const discountRatio = orderDetails.price.discount / totalBeforeDiscount;
    return item.price * discountRatio;
  };

  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    active: "bg-blue-100 text-blue-800 border-blue-200",
    delivered: "bg-purple-100 text-purple-800 border-purple-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600">Order #{orderDetails._id}</p>
      </div>

      <div className="grid gap-6">
        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <Clock className="w-5 h-5 mr-2" />
            Order Summary
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{formatDate(orderDetails.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    colors[
                      orderDetails.status.toLowerCase() as keyof typeof colors
                    ]
                  }`}
                >
                  {orderDetails.status.charAt(0).toUpperCase() +
                    orderDetails.status.slice(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Card */}
        <Card>
          <CardHeader>
            <Package className="w-5 h-5 mr-2" />
            Items
          </CardHeader>
          <CardContent>
            <div>
              <div className="divide-y">
                {orderDetails.items.map((item) => {
                  const itemDiscount = calculateItemDiscount(item);
                  const finalPrice = item.price - itemDiscount;
                  return (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <Image
                          src={item.image || "/api/placeholder/80/80"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-gray-600">
                              <span className="mr-2">
                                {formatPrice(item.price / item.quantity)} each
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="line-through text-gray-500">
                            {formatPrice(item.price)}
                          </p>
                          <p className="font-medium text-green-600">
                            {formatPrice(finalPrice)}
                          </p>
                          <p className="text-sm text-red-500">
                            -{formatPrice(itemDiscount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total Discount</span>
                  <span className="text-red-500">
                    -{formatPrice(orderDetails.price.discount)}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-between font-bold">
                  <span>Final Total</span>
                  <span>{formatPrice(orderDetails.price.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address Card */}
        <Card>
          <CardHeader>
            <MapPin className="w-5 h-5 mr-2" />
            Shipping Address
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">
                {orderDetails.shippingAddress.name.first}
              </p>
              <p>{orderDetails.shippingAddress.city}</p>
              <p>
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.region}{" "}
                {orderDetails.shippingAddress.postalCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information Card */}
        <Card>
          <CardHeader>
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Information
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                {orderDetails.payment.method === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
