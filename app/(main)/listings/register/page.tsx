import { CategorySidebar } from "@/components/layout/category-sidebar"
import { BannerAside } from "@/components/layout/banner-aside"
import { ListingRegisterForm } from "@/components/listings/register/listing-register-form"

export default function Page() {
  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-6">
        <h1 className="mb-6 text-xl font-bold">매물등록</h1>
        <ListingRegisterForm />
      </div>
    </CategorySidebar>
  )
}
