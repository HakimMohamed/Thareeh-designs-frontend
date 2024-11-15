import React from "react";
import { Skeleton } from "@nextui-org/react";
import { Card, CardFooter } from "@nextui-org/react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full">
      {/* Header Banner Skeleton */}
      <div className="p-4 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 mb-4">
        <Skeleton className="h-12 rounded-lg">
          <div className="h-12"></div>
        </Skeleton>
      </div>

      {/* Title Skeleton */}
      <div className="mb-4">
        <Skeleton className="rounded-lg">
          <div className="h-10 w-48"></div>
        </Skeleton>
      </div>

      {/* Filters Skeleton */}
      <div className="w-full mb-4">
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="flex-1 min-w-[200px] rounded-lg">
              <div className="h-10"></div>
            </Skeleton>
          ))}
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-4">
        {[...Array(10)].map((_, index) => (
          <Card key={index} className="space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-48 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/4 rounded-lg">
                <div className="h-6"></div>
              </Skeleton>
              <Skeleton className="w-full rounded-lg">
                <div className="h-4"></div>
              </Skeleton>
              <Skeleton className="w-2/3 rounded-lg">
                <div className="h-4"></div>
              </Skeleton>
            </div>
            <Skeleton className="rounded-lg">
              <div className="h-8 w-1/3"></div>
            </Skeleton>
            <CardFooter className="px-0 pb-0">
              <Skeleton className="w-full rounded-lg">
                <div className="h-10"></div>
              </Skeleton>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center">
        <div className="bg-white bg-opacity-90 shadow-lg p-4 rounded-lg">
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="rounded-lg">
                <div className="w-10 h-10"></div>
              </Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
