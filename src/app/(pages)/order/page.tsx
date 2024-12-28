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
            <Clock className="w-5 h-5  mr-2" />
            Order Summary
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{formatDate(orderDetails.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {orderDetails.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Card */}
        <Card>
          <CardHeader>
            <Package className="w-5 h-5  mr-2" />
            Items
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {orderDetails.items.map((item) => (
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
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        {formatPrice(item.price / item.quantity)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between font-bold">
                  <span>Discount</span>
                  <span className="text-red-500">
                    -{formatPrice(orderDetails.price.discount)}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(orderDetails.price.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address Card */}
        <Card>
          <CardHeader>
            <MapPin className="w-5 h-5  mr-2" />
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
