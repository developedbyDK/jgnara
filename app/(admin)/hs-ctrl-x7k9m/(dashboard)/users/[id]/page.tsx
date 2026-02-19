import { notFound } from "next/navigation";
import { getAdminUserById } from "../actions";
import { UserDetailCard } from "@/components/admin/users/user-detail-card";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getAdminUserById(id);

  if (!user) notFound();

  return <UserDetailCard user={user} />;
}
