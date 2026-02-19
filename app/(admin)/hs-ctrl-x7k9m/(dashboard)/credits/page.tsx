import { CreditPackageManager } from "@/components/admin/credits/credit-package-manager";

export default function AdminCreditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">포인트 패키지 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          포인트 충전 패키지를 추가, 수정, 삭제할 수 있습니다.
        </p>
      </div>
      <CreditPackageManager />
    </div>
  );
}
