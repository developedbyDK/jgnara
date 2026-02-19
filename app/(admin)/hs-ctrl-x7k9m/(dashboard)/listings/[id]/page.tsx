import { notFound } from "next/navigation";
import { getAdminListing } from "@/lib/listing-queries";
import { ListingDetailCard } from "@/components/admin/listings/listing-detail-card";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getAdminListing(id);

  if (!listing) notFound();

  return <ListingDetailCard listing={listing} />;
}
