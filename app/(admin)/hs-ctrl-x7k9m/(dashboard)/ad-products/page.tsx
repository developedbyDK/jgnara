import { AdProductManager } from "@/components/admin/ad-products/ad-product-manager";

export default function AdminAdProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">광고 상품 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          광고결제 페이지에 표시되는 광고 상품을 추가, 수정, 삭제할 수 있습니다.
        </p>
      </div>
      <AdProductManager />
    </div>
  );
}
