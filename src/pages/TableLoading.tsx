import { Skeleton } from "@/components/ui/skeleton";

const TableLoading = () => {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border p-4 shadow-sm">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" /> {/* Title */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default TableLoading;
