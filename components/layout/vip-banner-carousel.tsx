"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IconCrown } from "@tabler/icons-react";

const vipBanners = [
  {
    id: 1,
    title: "현대 굴삭기 HX220",
    description: "2022년식 / 3,200시간 / 상태 A급",
    price: "7,500만원",
    href: "#",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    id: 2,
    title: "두산 로더 DL200",
    description: "2021년식 / 2,800시간 / 즉시출고",
    price: "5,200만원",
    href: "#",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "볼보 덤프트럭 A30G",
    description: "2023년식 / 1,500시간 / 무사고",
    price: "1억 2,000만원",
    href: "#",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "CAT 크레인 320GC",
    description: "2022년식 / 2,100시간 / 풀옵션",
    price: "8,800만원",
    href: "#",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    title: "코벨코 굴삭기 SK200",
    description: "2023년식 / 900시간 / 신차급",
    price: "9,500만원",
    href: "#",
    gradient: "from-violet-500 to-purple-600",
  },
];

export function VipBannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Auto-play
  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative">
      {/* VIP Header */}
      <div className="mb-3 flex items-center gap-2">
        <IconCrown className="h-5 w-5 text-orange-500" />
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          VIP 매물
        </h2>
        <span className="text-xs text-neutral-400">{current + 1} / {count}</span>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {vipBanners.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={banner.href} className="cursor-pointer block">
                <div
                  className={cn(
                    "relative flex h-[140px] flex-col justify-between overflow-hidden bg-gradient-to-br p-4 shadow-sm transition-transform hover:scale-[1.02]",
                    banner.gradient,
                  )}
                >
                  {/* VIP badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 px-2 py-0.5 backdrop-blur-sm">
                    <IconCrown className="h-3 w-3 text-orange-200" />
                    <span className="text-[10px] font-bold text-white">VIP</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {banner.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/80">
                      {banner.description}
                    </p>
                  </div>

                  <p className="text-lg font-extrabold text-white">
                    {banner.price}
                  </p>
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
  );
}
