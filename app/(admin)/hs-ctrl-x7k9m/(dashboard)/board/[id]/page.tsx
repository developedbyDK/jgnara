import { notFound } from "next/navigation";
import { getAdminBoardPost } from "@/lib/admin-board-queries";
import { PostDetailCard } from "@/components/admin/board/post-detail-card";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) notFound();

  const post = await getAdminBoardPost(postId);

  if (!post) notFound();

  return <PostDetailCard post={post} />;
}
