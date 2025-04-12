import { Skeleton } from "@/components/ui/skeleton";

const CardLoading = () => {
  return (
    <div className="w-full py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white shadow-md rounded-xl p-6 space-y-4"
          >
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLoading;
