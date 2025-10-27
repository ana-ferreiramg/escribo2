"use client";

import Skeleton from "react-loading-skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton height={40} width={200} />
      <Skeleton height={40} width={200} />
      <Skeleton height={200} />
    </div>
  );
}
