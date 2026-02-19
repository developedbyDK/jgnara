import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IconMapPin, IconClock } from "@tabler/icons-react";
import type { ListingItem } from "@/lib/constants/mock-listings";
import { gradeStyle } from "@/lib/constants/mock-listings";

export function RelatedListings({ listings }: { listings: ListingItem[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
        관련 매물
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {listings.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge
                  className={cn(
                    "absolute top-2 left-2 text-[10px] font-bold",
                    gradeStyle[item.grade]
                  )}
                >
                  {item.grade}급
                </Badge>
              </div>
              <div className="p-2.5">
                <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm font-bold text-primary">
                  {item.priceLabel}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span>{item.year}년</span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span className="flex items-center gap-0.5">
                    <IconMapPin className="h-3 w-3" />
                    {item.region}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-600">|</span>
                  <span className="flex items-center gap-0.5">
                    <IconClock className="h-3 w-3" />
                    {item.hours}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
