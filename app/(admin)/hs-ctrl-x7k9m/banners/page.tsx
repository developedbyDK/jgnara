import { BannerManager } from "@/components/admin/banners/banner-manager";

export default function BannersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">배너관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          메인, VIP, 사이드 배너를 관리합니다.
        </p>
      </div>
      <BannerManager />
    </div>
  );
}
