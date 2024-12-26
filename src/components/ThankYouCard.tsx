"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

const ThankYouCard = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-indigo-500" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Thank You for Your Order!
        </h2>

        <p className="text-gray-600 text-center mb-6">
          We&apos;ve received your order and are working on it right away.
          You&apos;ll receive a confirmation email shortly with your order
          details.
        </p>

        <div className="bg-indigo-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-indigo-600">Order Number:</span>
            <span className="font-semibold text-indigo-700">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-indigo-600">Estimated Delivery:</span>
            <span className="font-semibold text-indigo-700">
              3-5 Business Days
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => router.push("/orders")}
          >
            View My Orders
          </button>
        </div>
      </div>

      <div className="bg-indigo-50 px-8 py-4 border-t border-indigo-100">
        <p className="text-sm text-indigo-600 text-center">
          Questions? Contact our support team at iabdelhakimmohamed@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ThankYouCard;
