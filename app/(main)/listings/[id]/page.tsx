import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/layout/category-sidebar";
import { BannerAside } from "@/components/layout/banner-aside";
import {
  getPublicListingDetail,
  getRelatedListingsPublic,
} from "@/lib/listing-queries";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { RelatedListings } from "@/components/listings/related-listings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getPublicListingDetail(id);
  if (!listing) return {};
  return {
    title: `${listing.title} - 중기나라`,
    description: `${listing.title} ${listing.price} ${listing.region} ${listing.year}년식`,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getPublicListingDetail(id);

  if (!listing) {
    notFound();
  }

  const related = await getRelatedListingsPublic(listing.category, listing.id);

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
            href={`/category/${encodeURIComponent(listing.category)}`}
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
