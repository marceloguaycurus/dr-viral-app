import { PostTabsNavigation } from "./post-tabs-navigation";
import { PostHeaderActions } from "./post-header-actions";

export function PostFeedHeader() {
  return (
    <header className="sm:sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-4">
          <PostTabsNavigation />
          <PostHeaderActions />
        </div>
      </div>
    </header>
  );
}
