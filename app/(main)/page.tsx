import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { VipBannerCarousel } from "@/components/layout/vip-banner-carousel";
import { MainBannerCarousel } from "@/components/layout/main-banner-carousel";
import { ListingGrid } from "@/components/layout/listing-grid";

export default function Page() {
  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-6">
        {/* Main Image Banner */}
        <MainBannerCarousel />

        {/* VIP Banner Carousel */}
        <div className="mt-6">
          <VipBannerCarousel />
        </div>

        {/* Listing Grid */}
        <ListingGrid />
      </div>
    </CategorySidebar>
  );
}
