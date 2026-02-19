import { ListingTable } from "@/components/admin/listings/listing-table";

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">매물관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          등록된 매물을 관리하고 심사합니다.
        </p>
      </div>
      <ListingTable />
    </div>
  );
}
