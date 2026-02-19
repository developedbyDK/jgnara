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
import { Skeleton } from "@/components/ui/skeleton";

type ActiveAd = {
  id: string;
  banner_image_url: string | null;
  link_url: string | null;
  ad_products: { name: string; slug: string; ad_zone: string } | null;
};

export function MainBannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [ads, setAds] = React.useState<ActiveAd[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/ads/active?zone=main-banner");
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
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  if (loading) {
    return <Skeleton className="h-[260px] w-full sm:h-[400px]" />;
  }

  if (ads.length === 0) {
    return null;
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="relative w-full"
    >
      <CarouselContent className="ml-0">
        {ads.map((ad) => (
          <CarouselItem key={ad.id} className="pl-0">
            <Link
              href={ad.link_url || "/"}
              className="cursor-pointer block"
              target={ad.link_url ? "_blank" : undefined}
              rel={ad.link_url ? "noopener noreferrer" : undefined}
            >
              <div className="relative h-[260px] w-full overflow-hidden sm:h-[400px]">
                {ad.banner_image_url ? (
                  <img
                    src={ad.banner_image_url}
                    alt={ad.ad_products?.name ?? "광고"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                    <span className="text-sm text-neutral-400">광고</span>
                  </div>
                )}
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {ads.length > 1 && (
        <>
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
                  i === current ? "w-5 bg-white" : "w-1.5 bg-white/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}
