import { Skeleton } from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <Skeleton
        className="rounded-md"
        style={{ height: "24px", width: "50%" }}
      />
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <div key={idx} className="flex justify-between">
            <Skeleton
              className="rounded-md"
              style={{ height: "20px", width: "40%" }}
            />
            <Skeleton
              className="rounded-md"
              style={{ height: "20px", width: "30%" }}
            />
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <Skeleton
          className="rounded-md"
          style={{ height: "24px", width: "40%" }}
        />
        <Skeleton
          className="rounded-md"
          style={{ height: "24px", width: "30%" }}
        />
      </div>
    </div>
  );
}
