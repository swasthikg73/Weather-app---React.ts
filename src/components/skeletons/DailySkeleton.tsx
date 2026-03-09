import { Card } from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export const DailySkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col ">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex justify-around my-2">
          <Skeleton className="w-9 h-8" />

          <Skeleton className="size-8 rounded-full" />

          <Skeleton className="size-8" />

          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
};
