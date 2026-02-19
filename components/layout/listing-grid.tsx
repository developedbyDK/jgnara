import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Grade = "A+" | "A" | "B+" | "B" | "C";

interface Listing {
  id: number;
  title: string;
  price: string;
  grade: Grade;
  image: string;
  href: string;
}

const gradeStyle: Record<Grade, string> = {
  "A+": "bg-orange-600 text-white",
  A: "bg-emerald-500 text-white",
  "B+": "bg-blue-500 text-white",
  B: "bg-neutral-500 text-white",
  C: "bg-neutral-300 text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200",
};

const listings: Listing[] = [
  {
    id: 1,
    title: "현대 굴삭기 HX220",
    price: "7,500만원",
    grade: "A+",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    title: "두산 로더 DL200",
    price: "5,200만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "볼보 덤프트럭 A30G",
    price: "1억 2,000만원",
    grade: "A+",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "CAT 크레인 320GC",
    price: "8,800만원",
    grade: "B+",
    image:
      "https://images.unsplash.com/photo-1621922688758-8d99e2bead70?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 5,
    title: "코벨코 굴삭기 SK200",
    price: "9,500만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 6,
    title: "히타치 ZX210",
    price: "6,800만원",
    grade: "A+",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 7,
    title: "두산 지게차 D30S",
    price: "2,300만원",
    grade: "B",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 8,
    title: "현대 믹서트럭 HD270",
    price: "4,500만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1621922688758-8d99e2bead70?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 9,
    title: "CAT 굴삭기 330D",
    price: "1억 500만원",
    grade: "A+",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 10,
    title: "볼보 굴삭기 EC480D",
    price: "1억 8,000만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 11,
    title: "두산 굴삭기 DX300",
    price: "8,200만원",
    grade: "B+",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 12,
    title: "코마츠 불도저 D65EX",
    price: "9,000만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1621922688758-8d99e2bead70?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 13,
    title: "현대 휠로더 HL960",
    price: "6,500만원",
    grade: "B+",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 14,
    title: "히타치 크레인 ZX350",
    price: "1억 3,000만원",
    grade: "A+",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 15,
    title: "두산 스키드로더 SSL",
    price: "3,200만원",
    grade: "B",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 16,
    title: "볼보 로더 L120H",
    price: "7,800만원",
    grade: "A",
    image:
      "https://images.unsplash.com/photo-1621922688758-8d99e2bead70?q=80&w=600&auto=format&fit=crop",
    href: "#",
  },
];

export function ListingGrid() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
        중기나라 매물
      </h2>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        다양한 중장비 매물을 확인하세요
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.map((item) => (
          <Link key={item.id} href={item.href} className="group cursor-pointer">
            <div className="overflow-hidden border border-neutral-200 bg-white transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge
                  className={cn(
                    "absolute top-2 left-2 text-[10px] font-bold",
                    gradeStyle[item.grade],
                  )}
                >
                  {item.grade}급
                </Badge>
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
    </div>
  );
}
