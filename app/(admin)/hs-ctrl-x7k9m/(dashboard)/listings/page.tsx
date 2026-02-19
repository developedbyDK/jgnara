import { ListingTable } from "@/components/admin/listings/listing-table";
import { getAdminListings } from "@/lib/listing-queries";

export default async function ListingsPage() {
  const listings = await getAdminListings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">매물관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          등록된 매물을 관리하고 심사합니다.
        </p>
      </div>
      <ListingTable listings={listings} />
    </div>
  );
}
