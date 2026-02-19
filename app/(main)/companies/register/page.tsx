import { CategorySidebar } from "@/components/layout/category-sidebar"
import { BannerAside } from "@/components/layout/banner-aside"
import { CompanyRegisterForm } from "@/components/companies/company-register-form"

export default function Page() {
  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-6">
        <h1 className="mb-6 text-xl font-bold">업체등록</h1>
        <CompanyRegisterForm />
      </div>
    </CategorySidebar>
  )
}
