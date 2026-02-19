import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import { getCategoryBySlug, CATEGORIES } from "@/lib/constants/categories";
import { CategoryListingContent } from "@/components/listings/category-listing-content";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.label} - 중기나라`,
    description: `${category.label} 중장비 매물 리스트`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <CategorySidebar aside={<BannerAside />}>
      <div className="p-4 sm:p-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            홈
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {category.label}
          </span>
        </nav>

        {/* Category Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {category.label}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {category.label} 카테고리의 매물 목록입니다
          </p>
        </div>

        {/* Subcategory Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={category.href}
            className="cursor-pointer border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            전체
          </Link>
          {category.subcategories.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="cursor-pointer border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-400"
            >
              {sub.label}
            </Link>
          ))}
        </div>

        {/* Listing Content (Client Component) */}
        <CategoryListingContent categorySlug={slug} />
      </div>
    </CategorySidebar>
  );
}
