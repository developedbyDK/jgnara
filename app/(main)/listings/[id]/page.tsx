import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import {
  getListingById,
  getRelatedListings,
  MOCK_LISTINGS,
} from "@/lib/constants/mock-listings";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { RelatedListings } from "@/components/listings/related-listings";

export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: String(l.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(Number(id));
  if (!listing) return {};
  return {
    title: `${listing.title} - 중기나라`,
    description: `${listing.title} ${listing.priceLabel} ${listing.region} ${listing.year}년식`,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(Number(id));

  if (!listing) {
    notFound();
  }

  const related = getRelatedListings(listing, 4);

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
            href={`/category/${listing.categorySlug}`}
            className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-neutral-200"
          >
            {listing.category}
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {listing.title}
          </span>
        </nav>

        {/* Detail Content */}
        <ListingDetailContent listing={listing} />

        {/* Related Listings */}
        {related.length > 0 && <RelatedListings listings={related} />}
      </div>
    </CategorySidebar>
  );
}
