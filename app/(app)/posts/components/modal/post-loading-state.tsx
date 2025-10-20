export function PostLoadingState() {
  return (
    <div className="flex flex-col md:flex-row h-[500px] p-6 gap-6">
      {/* Image skeleton - top on mobile, left on desktop */}
      <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-muted animate-pulse rounded-lg" />

      {/* Content skeleton - bottom on mobile, right on desktop */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
          <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
