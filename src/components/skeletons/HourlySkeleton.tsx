import { Card } from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

interface Props {}

export const HourlySkeleton = (props: Props) => {
  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-14 overflow-y-scroll ">
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 items-center p-2">
          <Skeleton className="w-15 h-6" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="w-8 h-6" />
        </div>
      ))}
    </Card>
  );
};
