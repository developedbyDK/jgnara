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
import type { Tables } from "@/lib/supabase/database.types"

const GRADIENTS = [
  "from-orange-500 to-amber-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-sky-500 to-cyan-600",
]

interface VipCompanyCarouselProps {
  companies: Tables<"companies">[]
}

export function VipCompanyCarousel({ companies }: VipCompanyCarouselProps) {
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

  if (companies.length === 0) return null

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
          {companies.map((company, i) => (
            <CarouselItem
              key={company.id}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/companies/${company.id}`} className="cursor-pointer block">
                <div
                  className={cn(
                    "relative flex h-[160px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br p-4 shadow-sm transition-transform hover:scale-[1.02]",
                    GRADIENTS[i % GRADIENTS.length],
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
                      {company.company_name}
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
