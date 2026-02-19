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
import { IconCrown, IconBuildingFactory, IconMapPin, IconCash } from "@tabler/icons-react"

const VIP_RECRUITS = [
  {
    id: 1,
    title: "25톤 크레인 운전기사 모집",
    company: "대한건설",
    region: "서울",
    salary: "월 400만원~",
    category: "운전기사",
    description: "경력 5년 이상, 장기근무 가능자 우대. 4대보험, 퇴직금.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 2,
    title: "굴착기 운전원 급구",
    company: "성진중기",
    region: "경기",
    salary: "월 350만원~",
    category: "운전기사",
    description: "장기근무 가능자, 숙식 제공, 즉시 출근 가능자 우대.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "중장비 유압 정비사 채용",
    company: "중기나라",
    region: "인천",
    salary: "월 380만원~",
    category: "정비사",
    description: "유압 전문 정비 경력자. 현대·두산 정비 경험 우대.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "타워크레인 운전원 모집",
    company: "극동건설",
    region: "경남",
    salary: "월 500만원~",
    category: "운전기사",
    description: "T/C 면허 소지자, 대형현장 경험 우대. 최고 대우.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    title: "현장 안전관리자 채용",
    company: "포스코건설",
    region: "충북",
    salary: "월 420만원~",
    category: "현장관리",
    description: "산업안전기사 자격증 소지자. 대기업 복리후생 적용.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    title: "건설기계 영업직 채용",
    company: "볼보건설기계",
    region: "서울",
    salary: "월 350만원+인센티브",
    category: "사무직",
    description: "건설기계 영업 경력 2년 이상. 인센티브 별도 지급.",
    gradient: "from-sky-500 to-cyan-600",
  },
]

export function VipRecruitCarousel() {
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
          VIP 구인
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
          {VIP_RECRUITS.map((recruit) => (
            <CarouselItem
              key={recruit.id}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/recruit/${recruit.id}`} className="cursor-pointer block">
                <div
                  className={cn(
                    "relative flex h-[160px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-4 shadow-sm transition-transform hover:scale-[1.02]",
                    recruit.gradient,
                  )}
                >
                  {/* VIP badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">
                    <IconCrown className="h-3 w-3 text-orange-200" />
                    <span className="text-[10px] font-bold text-white">VIP</span>
                  </div>

                  {/* Top: title + category + description */}
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {recruit.title}
                    </h3>
                    <span className="mt-0.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white/90">
                      {recruit.category}
                    </span>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80">
                      {recruit.description}
                    </p>
                  </div>

                  {/* Bottom: company + region + salary */}
                  <div className="flex items-center gap-3 text-[11px] text-white/70">
                    <span className="flex items-center gap-1">
                      <IconBuildingFactory className="h-3 w-3" />
                      {recruit.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconMapPin className="h-3 w-3" />
                      {recruit.region}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-white/90">
                      <IconCash className="h-3 w-3" />
                      {recruit.salary}
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
