import Link from "next/link"
import { CategorySidebar } from "@/components/layout/category-sidebar"
import { BannerAside } from "@/components/layout/banner-aside"
import { CompanySearchBoard } from "@/components/companies/company-search-board"
import { VipCompanyCarousel } from "@/components/companies/vip-company-carousel"

export const metadata = {
  title: "업체찾기 - 중기나라",
  description: "건설기계 관련 업체를 검색하고 찾아보세요",
}

export default function CompaniesPage() {
  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-4 sm:p-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            홈
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            업체찾기
          </span>
        </nav>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            업체찾기
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            건설기계 관련 업체를 검색하고 찾아보세요
          </p>
        </div>

        {/* VIP Company Carousel */}
        <div className="mt-4">
          <VipCompanyCarousel />
        </div>

        {/* Board */}
        <div className="mt-6">
          <CompanySearchBoard />
        </div>
      </div>
    </CategorySidebar>
  )
}
