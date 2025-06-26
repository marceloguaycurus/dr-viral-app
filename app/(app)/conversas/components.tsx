import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ConversationSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-3 border-b">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-10 ml-2" />
        </div>
        <div className="flex justify-between items-center mt-1">
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  )
}

export function ConversationsLoading() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <Skeleton className="h-9 w-full" />
        </div>

        <ScrollArea className="flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <ConversationSkeleton key={i} />
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-6 w-40 mt-4" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
    </div>
  )
} 