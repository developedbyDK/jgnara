"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import {
  IconPhone,
  IconMapPin,
  IconWorld,
  IconSearch,
  IconPencil,
} from "@tabler/icons-react"
import type { Tables } from "@/lib/supabase/database.types"

export type Company = Tables<"companies">

const CATEGORIES = [
  "전체",
  "건설기계임대차",
  "건설기계매매",
  "정비업체",
  "부품업체",
  "제조 및 수출입업체",
  "건설기계지입사",
  "추레라업체",
  "기타건설관련업",
  "기타일반업",
]

const CATEGORY_COLORS: Record<string, string> = {
  건설기계임대차:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  건설기계매매:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  정비업체:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  부품업체:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "제조 및 수출입업체":
    "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  건설기계지입사:
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  추레라업체:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  기타건설관련업:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  기타일반업:
    "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300",
}

const ITEMS_PER_PAGE = 9

interface CompanySearchBoardProps {
  companies: Company[]
}

export function CompanySearchBoard({ companies }: CompanySearchBoardProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = companies.filter((item) => {
    if (selectedCategory !== "전체" && item.category !== selectedCategory)
      return false
    if (
      searchQuery &&
      !item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(item.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="업체명, 주소, 소개 검색"
            className="pl-9"
          />
        </div>
        <Button type="submit" size="sm" className="cursor-pointer px-4">
          검색
        </Button>
      </form>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="xs"
            className="cursor-pointer"
            onClick={() => {
              setSelectedCategory(cat)
              setCurrentPage(1)
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Result count + Register button */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          총 {filteredData.length}개 업체
        </span>
        <Button size="sm" className="cursor-pointer gap-1" asChild>
          <Link href="/companies/register">
            <IconPencil className="size-3.5" />
            업체등록
          </Link>
        </Button>
      </div>

      {/* Company cards grid */}
      {paginatedData.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedData.map((company) => (
            <div
              key={company.id}
              className="cursor-pointer rounded-lg border bg-card p-4 transition hover:shadow-md"
            >
              {/* Header: logo + name */}
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={company.company_name}
                      className="h-full w-full rounded-md object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold">
                      {company.company_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold">
                    {company.company_name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={CATEGORY_COLORS[company.category] || ""}
                  >
                    {company.category}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                {company.description}
              </p>

              {/* Info */}
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IconPhone className="size-3.5 shrink-0" />
                  <span className="truncate">{company.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconMapPin className="size-3.5 shrink-0" />
                  <span className="truncate">{company.address}</span>
                </div>
                {company.website && (
                  <div className="flex items-center gap-2">
                    <IconWorld className="size-3.5 shrink-0" />
                    <span className="truncate text-primary">
                      {company.website}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="이전"
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                text="다음"
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
