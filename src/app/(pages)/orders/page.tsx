"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Package } from "lucide-react";
import { OrdersService } from "@/services/order";
import { IOrder } from "@/interfaces/order.interface";
import { useRouter } from "next/navigation";

export default function MyOrdersTable() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 6; // Reduced for better card layout
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { orders, count } = await OrdersService.getOrders(page, pageSize);
        setIsLoading(false);
        setOrdersCount(count);
        setOrders(orders);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };
    fetchOrders();
  }, [page]);

  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    active: "bg-blue-100 text-blue-800 border-blue-200",
    delivered: "bg-purple-100 text-purple-800 border-purple-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <p className="mt-1 text-gray-500">View and manage your order history</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Order #{order._id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        colors[order.status]
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center text-gray-500">
                      <Package className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {order.items.length} items
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {order.price.total.toString()} EGP
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => router.push(`/order?id=${order._id}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, ordersCount)} of {ordersCount} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(ordersCount / pageSize)}
                className="px-4 py-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
