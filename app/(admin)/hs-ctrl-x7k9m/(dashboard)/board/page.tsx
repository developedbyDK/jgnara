import { getAdminBoardPosts } from "@/lib/admin-board-queries";
import { PostTable } from "@/components/admin/board/post-table";

export default async function BoardPage() {
  const posts = await getAdminBoardPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">게시판관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          게시글을 관리하고 신고를 처리합니다.
        </p>
      </div>
      <PostTable posts={posts} />
    </div>
  );
}
