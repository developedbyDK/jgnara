import { notFound } from "next/navigation";
import { MOCK_ADMIN_LISTINGS } from "@/lib/constants/mock-admin";
import { ListingDetailCard } from "@/components/admin/listings/listing-detail-card";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = MOCK_ADMIN_LISTINGS.find((l) => l.id === id);

  if (!listing) notFound();

  return <ListingDetailCard listing={listing} />;
}
