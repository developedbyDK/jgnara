"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const banners = [
  {
    id: 1,
    label: "광고 배너",
    href: "#",
    bgColor: "bg-orange-500",
  },
  {
    id: 2,
    label: "광고 배너",
    href: "#",
    bgColor: "bg-blue-500",
  },
  {
    id: 3,
    label: "광고 배너",
    href: "#",
    bgColor: "bg-emerald-500",
  },
  {
    id: 4,
    label: "광고 배너",
    href: "#",
    bgColor: "bg-rose-500",
  },
  {
    id: 5,
    label: "광고 배너",
    href: "#",
    bgColor: "bg-purple-500",
  },
];

export function BannerAside() {
  const [order, setOrder] = useState(banners);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Link
        href="/advertising"
        className="group cursor-pointer"
      >
        <div className="flex h-[120px] items-center justify-center border border-neutral-200 bg-white shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800 dark:bg-neutral-900">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            광고문의
          </span>
        </div>
      </Link>
      {order.map((banner) => (
        <motion.div
          key={banner.id}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <Link
            href={banner.href}
            className="group cursor-pointer"
          >
            <div
              className={`flex h-[120px] items-center justify-center border border-neutral-200 shadow-sm transition-opacity group-hover:opacity-90 dark:border-neutral-800 ${banner.bgColor}`}
            >
              <span className="text-xs font-semibold text-white/90">
                {banner.label} {banner.id}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
