"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Skeleton } from "@/components/ui/skeleton";

type ActiveAd = {
  id: string;
  banner_image_url: string | null;
  link_url: string | null;
  ad_products: { name: string; slug: string; ad_zone: string } | null;
};

export function BannerAside() {
  const [ads, setAds] = useState<ActiveAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<ActiveAd[]>([]);

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/ads/active?zone=side-banner");
        if (res.ok) {
          const data = await res.json();
          setAds(data);
          setOrder(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, []);

  useEffect(() => {
    if (order.length <= 1) return;
    const interval = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 5000);
    return () => clearInterval(interval);
  }, [order.length]);

  if (loading) {
    return (
      <>
        <Link href="/advertising" className="cursor-pointer">
          <CardSpotlight className="flex h-[120px] items-center justify-center p-4">
            <div className="relative z-20 text-center">
              <p className="text-sm font-bold text-white">광고문의</p>
              <p className="mt-1 text-xs text-neutral-400">
                배너 광고를 원하시면 클릭하세요
              </p>
            </div>
          </CardSpotlight>
        </Link>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full" />
        ))}
      </>
    );
  }

  return (
    <>
      <Link href="/advertising" className="cursor-pointer">
        <CardSpotlight className="flex h-[120px] items-center justify-center p-4">
          <div className="relative z-20 text-center">
            <p className="text-sm font-bold text-white">광고문의</p>
            <p className="mt-1 text-xs text-neutral-400">
              배너 광고를 원하시면 클릭하세요
            </p>
          </div>
        </CardSpotlight>
      </Link>
      {order.map((ad) => (
        <motion.div
          key={ad.id}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <Link
            href={ad.link_url || "/"}
            className="group cursor-pointer"
            target={ad.link_url ? "_blank" : undefined}
            rel={ad.link_url ? "noopener noreferrer" : undefined}
          >
            <div className="flex h-[120px] items-center justify-center overflow-hidden border border-neutral-200 shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800">
              {ad.banner_image_url ? (
                <img
                  src={ad.banner_image_url}
                  alt={ad.ad_products?.name ?? "광고"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-neutral-400">
                  {ad.ad_products?.name ?? "광고"}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
