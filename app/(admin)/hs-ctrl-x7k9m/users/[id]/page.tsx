import { notFound } from "next/navigation";
import { MOCK_USERS } from "@/lib/constants/mock-admin";
import { UserDetailCard } from "@/components/admin/users/user-detail-card";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) notFound();

  return <UserDetailCard user={user} />;
}
