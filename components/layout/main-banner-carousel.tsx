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

const mainBanners = [
  {
    id: 1,
    title: "중기나라 중장비 매매",
    subtitle: "믿을 수 있는 중장비 직거래 플랫폼",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "신규 매물 업데이트",
    subtitle: "매일 새로운 중장비 매물을 확인하세요",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "업체 등록 무료 이벤트",
    subtitle: "지금 업체를 등록하고 홍보 효과를 누리세요",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1920&auto=format&fit=crop",
  },
];

export function MainBannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="relative w-full"
    >
      <CarouselContent className="ml-0">
        {mainBanners.map((banner) => (
          <CarouselItem key={banner.id} className="pl-0">
            <Link href={banner.href} className="cursor-pointer block">
              <div className="relative h-[200px] w-full overflow-hidden sm:h-[260px]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="text-lg font-extrabold text-white sm:text-xl">
                    {banner.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/80">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="cursor-pointer left-3 h-8 w-8 border-0 bg-white/20 text-white shadow-md backdrop-blur-sm hover:bg-white/40 dark:bg-black/30 dark:hover:bg-black/50" />
      <CarouselNext className="cursor-pointer right-3 h-8 w-8 border-0 bg-white/20 text-white shadow-md backdrop-blur-sm hover:bg-white/40 dark:bg-black/30 dark:hover:bg-black/50" />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-all",
              i === current
                ? "w-5 bg-white"
                : "w-1.5 bg-white/50",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}
