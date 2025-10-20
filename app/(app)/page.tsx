import { PostFeedHeader } from "@/app/(app)/posts/components/header/post-feed-header";
import { PostsGrid } from "@/app/(app)/posts/components/posts-grid";
import { getPosts } from "@/lib/utils/dataFunctions/bd-management";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";

export default async function Page() {
  const userData = await getUserData();
  const posts = await getPosts(userData?.activeCompanyId ?? "");
  return (
    <>
      <PostFeedHeader />

      <div className="container mx-auto sm:px-12 px-4 py-6">
        <PostsGrid posts={posts} />
      </div>
    </>
  );
}
