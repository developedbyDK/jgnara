"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const banners = [
  { id: 1, label: "광고 배너", href: "#", bgColor: "bg-orange-500" },
  { id: 2, label: "광고 배너", href: "#", bgColor: "bg-blue-500" },
  { id: 3, label: "광고 배너", href: "#", bgColor: "bg-emerald-500" },
  { id: 4, label: "광고 배너", href: "#", bgColor: "bg-rose-500" },
  { id: 5, label: "광고 배너", href: "#", bgColor: "bg-purple-500" },
];

// ─── Top Carousel (single banner, auto-rotate) ─────
export function MobileBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];

  return (
    <div className="relative mx-2 mt-2 overflow-hidden lg:hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={banner.id}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Link href={banner.href} className="group cursor-pointer block">
            <div
              className={`flex h-[72px] items-center justify-center border border-neutral-200 shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800 ${banner.bgColor}`}
            >
              <span className="text-xs font-semibold text-white/90">
                {banner.label} {banner.id}
              </span>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <IconChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={next}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1 text-white backdrop-blur-sm transition hover:bg-black/50"
      >
        <IconChevronRight className="h-3.5 w-3.5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1 cursor-pointer rounded-full transition-all ${
              i === current
                ? "w-4 bg-white"
                : "w-1 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Bottom Grid (remaining banners) ────────────────
export function MobileBannerGrid() {
  return (
    <div className="mx-2 mb-2 grid grid-cols-2 gap-2 lg:hidden">
      <Link href="/contact/ad" className="group cursor-pointer">
        <div className="flex h-[72px] items-center justify-center border border-neutral-200 bg-white shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            광고문의
          </span>
        </div>
      </Link>
      {banners.slice(0, 3).map((banner) => (
        <Link
          key={banner.id}
          href={banner.href}
          className="group cursor-pointer"
        >
          <div
            className={`flex h-[72px] items-center justify-center border border-neutral-200 shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800 ${banner.bgColor}`}
          >
            <span className="text-xs font-semibold text-white/90">
              {banner.label} {banner.id}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
