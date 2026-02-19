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
import { Skeleton } from "@/components/ui/skeleton";

type ActiveAd = {
  id: string;
  banner_image_url: string | null;
  link_url: string | null;
  ad_products: { name: string; slug: string; ad_zone: string } | null;
};

export function VipBannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [ads, setAds] = React.useState<ActiveAd[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/ads/active?zone=vip-listing");
        if (res.ok) {
          const data = await res.json();
          setAds(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, []);

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
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  if (loading) {
    return (
      <div>
        <div className="mb-3 flex items-center gap-2">
          <IconCrown className="h-5 w-5 text-orange-500" />
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            VIP 매물
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* VIP Header */}
      <div className="mb-3 flex items-center gap-2">
        <IconCrown className="h-5 w-5 text-orange-500" />
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          VIP 매물
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
          {ads.map((ad) => (
            <CarouselItem
              key={ad.id}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={ad.link_url || "/"}
                className="cursor-pointer block"
                target={ad.link_url ? "_blank" : undefined}
                rel={ad.link_url ? "noopener noreferrer" : undefined}
              >
                <div className="relative flex h-[140px] items-center justify-center overflow-hidden shadow-sm transition-transform hover:scale-[1.02]">
                  {/* VIP badge */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/20 px-2 py-0.5 backdrop-blur-sm">
                    <IconCrown className="h-3 w-3 text-orange-200" />
                    <span className="text-[10px] font-bold text-white">
                      VIP
                    </span>
                  </div>

                  {ad.banner_image_url ? (
                    <img
                      src={ad.banner_image_url}
                      alt={ad.ad_products?.name ?? "VIP 매물"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600">
                      <span className="text-sm font-bold text-white">
                        {ad.ad_products?.name ?? "VIP 매물"}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {ads.length > 1 && (
          <>
            <CarouselPrevious className="cursor-pointer -left-3 h-8 w-8 border-neutral-200 bg-white/90 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90" />
            <CarouselNext className="cursor-pointer -right-3 h-8 w-8 border-neutral-200 bg-white/90 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90" />
          </>
        )}
      </Carousel>

      {/* Dots */}
      {ads.length > 1 && (
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
      )}
    </div>
  );
}
