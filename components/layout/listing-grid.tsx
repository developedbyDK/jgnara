import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getPublicListings } from "@/lib/listing-queries";

type Grade = "A+" | "A" | "B+" | "B" | "C";

const gradeStyle: Record<Grade, string> = {
  "A+": "bg-orange-600 text-white",
  A: "bg-emerald-500 text-white",
  "B+": "bg-blue-500 text-white",
  B: "bg-neutral-500 text-white",
  C: "bg-neutral-300 text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200",
};

function isGrade(value: string): value is Grade {
  return ["A+", "A", "B+", "B", "C"].includes(value);
}

export async function ListingGrid() {
  const listings = await getPublicListings();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
        중기나라 매물
      </h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        다양한 중장비 매물을 확인하세요
      </p>

      {listings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-16 text-neutral-400 dark:text-neutral-500">
          <p className="text-sm">등록된 매물이 없습니다</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((item) => (
            <Link
              key={item.id}
              href={`/listings/${item.id}`}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                      이미지 없음
                    </div>
                  )}
                  {isGrade(item.grade) && (
                    <Badge
                      className={cn(
                        "absolute top-2 left-2 text-[10px] font-bold",
                        gradeStyle[item.grade],
                      )}
                    >
                      {item.grade}급
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-bold text-primary">
                    {item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
