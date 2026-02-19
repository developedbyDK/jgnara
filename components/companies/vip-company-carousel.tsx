"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { IconCrown, IconPhone, IconMapPin } from "@tabler/icons-react"

const VIP_COMPANIES = [
  {
    id: 1,
    companyName: "성호기계",
    category: "건설기계매매",
    address: "경기도 화성시 팔탄면 서해로 500",
    contact: "031-123-4567",
    description: "굴착기, 로더, 크레인 등 대형 건설기계 매매 전문. 20년 경력.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 2,
    companyName: "영희중장비",
    category: "건설기계임대차",
    address: "서울특별시 강서구 공항대로 200",
    contact: "02-987-6543",
    description: "전국 단기/장기 건설기계 임대. 굴삭기, 지게차 다수 보유.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    companyName: "대성정비공업",
    category: "정비업체",
    address: "인천광역시 남동구 산업로 150",
    contact: "032-555-7890",
    description: "중장비 엔진·유압 정비 전문. 현대·두산·볼보 공식 협력사.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    companyName: "한국특수운송",
    category: "추레라업체",
    address: "경기도 평택시 포승읍 산단로 88",
    contact: "031-666-7777",
    description: "중장비 전문 추레라 운송. 전국 어디든 안전하고 빠르게.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    companyName: "글로벌파츠",
    category: "부품업체",
    address: "부산광역시 강서구 녹산산업로 300",
    contact: "051-888-9999",
    description: "건설기계 순정·호환부품 전문. 해외 직수입 부품 최저가.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    companyName: "제일크레인",
    category: "건설기계임대차",
    address: "경기도 안산시 단원구 고잔로 45",
    contact: "031-444-5555",
    description: "크레인·고소작업차 전문 임대. 50톤~500톤 보유.",
    gradient: "from-sky-500 to-cyan-600",
  },
]

export function VipCompanyCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  React.useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [api])

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <IconCrown className="h-5 w-5 text-orange-500" />
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          VIP 업체
        </h2>
        <span className="text-xs text-neutral-400">
          {current + 1} / {count}
        </span>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {VIP_COMPANIES.map((company) => (
            <CarouselItem
              key={company.id}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/companies/${company.id}`} className="cursor-pointer block">
                <div
                  className={cn(
                    "relative flex h-[160px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-4 shadow-sm transition-transform hover:scale-[1.02]",
                    company.gradient,
                  )}
                >
                  {/* VIP badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">
                    <IconCrown className="h-3 w-3 text-orange-200" />
                    <span className="text-[10px] font-bold text-white">VIP</span>
                  </div>

                  {/* Top: name + category */}
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {company.companyName}
                    </h3>
                    <span className="mt-0.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white/90">
                      {company.category}
                    </span>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80">
                      {company.description}
                    </p>
                  </div>

                  {/* Bottom: contact + address */}
                  <div className="flex items-center gap-3 text-[11px] text-white/70">
                    <span className="flex items-center gap-1">
                      <IconPhone className="h-3 w-3" />
                      {company.contact}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <IconMapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{company.address}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="cursor-pointer -left-3 h-8 w-8 border-neutral-200 bg-white/90 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90" />
        <CarouselNext className="cursor-pointer -right-3 h-8 w-8 border-neutral-200 bg-white/90 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90" />
      </Carousel>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all",
              i === current
                ? "w-4 bg-orange-500"
                : "w-1.5 bg-neutral-300 dark:bg-neutral-600",
            )}
          />
        ))}
      </div>
    </div>
  )
}
