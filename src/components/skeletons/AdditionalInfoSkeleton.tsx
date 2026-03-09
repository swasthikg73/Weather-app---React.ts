import { Card } from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export const AdditionalInfoSkeleton = () => {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="flex justify-between" key={i}>
          <div className="flex gap-4 items-center">
            <Skeleton className="w-20 h-8 bg-sidebar" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <span>
            <Skeleton className="size-8 rounded-full" />
          </span>
        </div>
      ))}
    </Card>
  );
};
