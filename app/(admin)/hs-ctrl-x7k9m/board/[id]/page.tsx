import { notFound } from "next/navigation";
import { MOCK_POSTS } from "@/lib/constants/mock-admin";
import { PostDetailCard } from "@/components/admin/board/post-detail-card";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) notFound();

  return <PostDetailCard post={post} />;
}
