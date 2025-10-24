import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PostLoadingStateProps {
  open: boolean;
}

export function PostLoadingState({ open }: PostLoadingStateProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[600px]">
        {/* Content skeleton - bottom on mobile, right on desktop */}
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-6 w-24" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
