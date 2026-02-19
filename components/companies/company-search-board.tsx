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

type Company = {
  id: number
  category: string
  companyName: string
  address: string
  contact: string
  fax: string
  website: string
  description: string
  logoUrl: string | null
}

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

const MOCK_COMPANIES: Company[] = [
  {
    id: 1,
    category: "건설기계매매",
    companyName: "중기나라",
    address: "경기도 화성시 팔탄면 서해로 1234",
    contact: "031-000-0000",
    fax: "031-000-0001",
    website: "https://hsheavy.com",
    description:
      "굴착기, 로더, 크레인 등 다양한 건설기계를 매매하는 전문업체입니다.",
    logoUrl: null,
  },
  {
    id: 2,
    category: "건설기계임대차",
    companyName: "대한중기렌탈",
    address: "서울특별시 강남구 테헤란로 456",
    contact: "02-123-4567",
    fax: "02-123-4568",
    website: "",
    description:
      "건설기계 장단기 임대 전문. 굴착기, 불도저, 크레인 등 다양한 장비를 보유하고 있습니다.",
    logoUrl: null,
  },
  {
    id: 3,
    category: "정비업체",
    companyName: "신한정비공업사",
    address: "인천광역시 서구 가좌동 789",
    contact: "032-987-6543",
    fax: "032-987-6544",
    website: "",
    description: "중장비 유압, 엔진 정비 전문. 20년 경력의 전문 기술진 보유.",
    logoUrl: null,
  },
  {
    id: 4,
    category: "부품업체",
    companyName: "우성부품",
    address: "경기도 안산시 단원구 산업로 321",
    contact: "031-555-1234",
    fax: "031-555-1235",
    website: "https://example.com",
    description:
      "굴착기, 로더, 지게차 등 건설기계 순정부품 및 호환부품 판매.",
    logoUrl: null,
  },
  {
    id: 5,
    category: "제조 및 수출입업체",
    companyName: "글로벌머시너리",
    address: "부산광역시 강서구 녹산산업로 567",
    contact: "051-777-8888",
    fax: "051-777-8889",
    website: "https://example.com",
    description:
      "건설기계 부착물 제조 및 해외 수출입 전문. 브레이커, 버켓 등 제조.",
    logoUrl: null,
  },
  {
    id: 6,
    category: "건설기계지입사",
    companyName: "삼성지입사",
    address: "대전광역시 유성구 대학로 100",
    contact: "042-333-4444",
    fax: "042-333-4445",
    website: "",
    description: "건설기계 지입 전문. 안정적인 물량 확보와 관리 서비스 제공.",
    logoUrl: null,
  },
  {
    id: 7,
    category: "추레라업체",
    companyName: "한국특수운송",
    address: "경기도 평택시 포승읍 산단로 200",
    contact: "031-666-7777",
    fax: "031-666-7778",
    website: "",
    description:
      "중장비 운송 전문 추레라업체. 전국 어디든 안전하게 운송합니다.",
    logoUrl: null,
  },
  {
    id: 8,
    category: "건설기계매매",
    companyName: "동원중기",
    address: "경기도 시흥시 정왕동 456",
    contact: "031-888-9999",
    fax: "031-888-9998",
    website: "",
    description: "중고 건설기계 매매 전문. 굴착기, 크레인 다수 보유.",
    logoUrl: null,
  },
  {
    id: 9,
    category: "정비업체",
    companyName: "제일유압정비",
    address: "충남 천안시 서북구 성정동 100",
    contact: "041-222-3333",
    fax: "041-222-3334",
    website: "",
    description: "유압장치 전문 정비. 실린더, 펌프, 밸브 수리.",
    logoUrl: null,
  },
  {
    id: 10,
    category: "기타건설관련업",
    companyName: "건설안전교육원",
    address: "서울특별시 송파구 올림픽로 300",
    contact: "02-444-5555",
    fax: "02-444-5556",
    website: "https://example.com",
    description: "건설기계 안전교육 및 자격증 취득 전문 교육기관.",
    logoUrl: null,
  },
  {
    id: 11,
    category: "건설기계임대차",
    companyName: "경인중기렌탈",
    address: "경기도 부천시 원미구 중동로 55",
    contact: "032-111-2222",
    fax: "032-111-2223",
    website: "",
    description: "수도권 건설기계 단기 임대 전문. 빠른 출동 서비스.",
    logoUrl: null,
  },
  {
    id: 12,
    category: "부품업체",
    companyName: "태양기계부품",
    address: "경남 창원시 의창구 팔용동 78",
    contact: "055-999-8888",
    fax: "055-999-8889",
    website: "",
    description: "건설기계 엔진부품, 하부부품 전문 공급.",
    logoUrl: null,
  },
]

const ITEMS_PER_PAGE = 9

export function CompanySearchBoard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = MOCK_COMPANIES.filter((item) => {
    if (selectedCategory !== "전체" && item.category !== selectedCategory)
      return false
    if (
      searchQuery &&
      !item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.companyName}
                      className="h-full w-full rounded-md object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold">
                      {company.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold">
                    {company.companyName}
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
