import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import {
  fetchCategoryBySlug,
  fetchCategories,
  fetchSubcategoryBySlug,
} from "@/lib/category-queries";
import { CategoryListingContent } from "@/components/listings/category-listing-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const parent = await fetchCategoryBySlug(slug);
  if (!parent) return {};
  const sub = await fetchSubcategoryBySlug(subSlug, parent.id);
  if (!sub) return {};
  return {
    title: `${sub.label} - ${parent.label} - 중기나라`,
    description: `${parent.label} ${sub.label} 중장비 매물 리스트`,
  };
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const parent = await fetchCategoryBySlug(slug);

  if (!parent) {
    notFound();
  }

  const subcategory = await fetchSubcategoryBySlug(subSlug, parent.id);

  if (!subcategory) {
    notFound();
  }

  // 형제 하위 카테고리 조회
  const allRows = await fetchCategories();
  const siblings = allRows
    .filter((r) => r.parent_id === parent.id)
    .sort((a, b) => a.sort_order - b.sort_order);

  const parentHref = `/category/${parent.slug}`;

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
          <Link
            href={parentHref}
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            {parent.label}
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {subcategory.label}
          </span>
        </nav>

        {/* Category Header */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {subcategory.label}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {parent.label} &gt; {subcategory.label} 카테고리의 매물 목록입니다
          </p>
        </div>

        {/* Subcategory Chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={parentHref}
            className="cursor-pointer border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-400"
          >
            전체
          </Link>
          {siblings.map((sib) => (
            <Link
              key={sib.id}
              href={`/category/${slug}/${sib.slug}`}
              className={
                sib.id === subcategory.id
                  ? "cursor-pointer border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                  : "cursor-pointer border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-400"
              }
            >
              {sib.label}
            </Link>
          ))}
        </div>

        {/* Listing Content (Client Component) */}
        <CategoryListingContent
          categoryLabel={parent.label}
          subcategoryLabel={subcategory.label}
        />
      </div>
    </CategorySidebar>
  );
}
