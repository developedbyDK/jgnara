import { AdPurchaseManager } from "@/components/admin/ad-purchases/ad-purchase-manager";

export default function AdminAdPurchasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">광고 구매 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          사용자의 광고 구매를 승인하거나 거절할 수 있습니다. 승인 시 광고
          기간이 시작됩니다.
        </p>
      </div>
      <AdPurchaseManager />
    </div>
  );
}
