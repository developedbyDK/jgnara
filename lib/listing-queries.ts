import { createClient } from "@/lib/supabase/server";

// ── Status mapping: DB (English) → UI (Korean) ──

const STATUS_MAP: Record<string, string> = {
  active: "판매중",
  pending: "심사중",
  sold: "판매완료",
  deleted: "삭제",
  reserved: "예약중",
  rejected: "반려",
};

export const STATUS_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(STATUS_MAP).map(([k, v]) => [v, k])
);

// ── Types ──

export type AdminListingView = {
  id: string;
  title: string;
  category: string;
  price: string;
  seller: string;
  status: string; // Korean label
  createdAt: string;
  views: number;
};

export type AdminListingDetail = {
  id: string;
  title: string;
  category: string;
  price: string;
  priceRaw: number;
  seller: string;
  sellerPhone: string;
  status: string; // Korean label
  statusRaw: string; // DB value
  createdAt: string;
  views: number;
  region: string;
  year: number;
  month: number;
  manufacturer: string;
  model: string;
  condition: string;
  tonnage: number | null;
  listingType: string;
  type: string;
  description: string | null;
  photos: string[] | null;
};

// ── Helpers ──

function formatPrice(price: number): string {
  if (price >= 10000) {
    const eok = Math.floor(price / 10000);
    const man = price % 10000;
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  return `${price.toLocaleString()}만원`;
}

function formatUsage(amount: number | null, unit: string | null): string {
  if (!amount) return "-";
  return `${amount.toLocaleString()}${unit ?? ""}`;
}

// ── Public types ──

export type PublicListingCard = {
  id: string;
  title: string;
  price: string;
  grade: string;
  image: string | null;
  category: string;
  region: string;
  year: number;
  type: string;
  usageLabel: string;
};

export type PublicListingDetail = {
  id: string;
  title: string;
  price: string;
  grade: string;
  type: string;
  year: number;
  month: number;
  category: string;
  manufacturer: string;
  model: string;
  engine: string | null;
  transmission: string | null;
  tonnage: number | null;
  region: string;
  payment: string | null;
  usageLabel: string;
  undercarriageType: string | null;
  undercarriageCondition: string | null;
  companyName: string;
  contact: string;
  photos: string[];
  description: string | null;
  youtubeUrl: string | null;
  listingType: string;
  createdAt: string;
};

// ── Queries ──

export async function getPublicListings(
  limit = 16
): Promise<PublicListingCard[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, manufacturer, model, category, condition, price, region, photos, type, year, usage_amount, usage_unit"
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getPublicListings error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: `${row.manufacturer} ${row.model}`,
    price: formatPrice(row.price),
    grade: row.condition,
    image: row.photos?.[0] ?? null,
    category: row.category,
    region: row.region,
    year: row.year,
    type: row.type,
    usageLabel: formatUsage(row.usage_amount, row.usage_unit),
  }));
}

export async function getPublicListingDetail(
  id: string
): Promise<PublicListingDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, manufacturer, model, category, condition, price, region, photos, type, year, month, engine, transmission, tonnage, payment, usage_amount, usage_unit, undercarriage_type, undercarriage_condition, company_name, contact, description, youtube_url, listing_type, created_at"
    )
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: `${data.manufacturer} ${data.model}`,
    price: formatPrice(data.price),
    grade: data.condition,
    type: data.type,
    year: data.year,
    month: data.month,
    category: data.category,
    manufacturer: data.manufacturer,
    model: data.model,
    engine: data.engine,
    transmission: data.transmission,
    tonnage: data.tonnage,
    region: data.region,
    payment: data.payment,
    usageLabel: formatUsage(data.usage_amount, data.usage_unit),
    undercarriageType: data.undercarriage_type,
    undercarriageCondition: data.undercarriage_condition,
    companyName: data.company_name || "개인",
    contact: data.contact,
    photos: data.photos ?? [],
    description: data.description,
    youtubeUrl: data.youtube_url,
    listingType: data.listing_type,
    createdAt: data.created_at.slice(0, 10),
  };
}

export async function getRelatedListingsPublic(
  category: string,
  excludeId: string,
  limit = 4
): Promise<PublicListingCard[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, manufacturer, model, category, condition, price, region, photos, type, year, usage_amount, usage_unit"
    )
    .eq("status", "active")
    .eq("category", category)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: `${row.manufacturer} ${row.model}`,
    price: formatPrice(row.price),
    grade: row.condition,
    image: row.photos?.[0] ?? null,
    category: row.category,
    region: row.region,
    year: row.year,
    type: row.type,
    usageLabel: formatUsage(row.usage_amount, row.usage_unit),
  }));
}

export async function getAdminListings(): Promise<AdminListingView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, manufacturer, model, category, price, company_name, status, created_at, views"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAdminListings error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: `${row.manufacturer} ${row.model}`,
    category: row.category,
    price: formatPrice(row.price),
    seller: row.company_name || "개인",
    status: STATUS_MAP[row.status] || row.status,
    createdAt: row.created_at.slice(0, 10),
    views: row.views ?? 0,
  }));
}

export async function getAdminListing(
  id: string
): Promise<AdminListingDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(
      "id, manufacturer, model, category, price, company_name, contact, status, created_at, views, region, year, month, condition, tonnage, listing_type, type, description, photos"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getAdminListing error:", error);
    return null;
  }

  return {
    id: data.id,
    title: `${data.manufacturer} ${data.model}`,
    category: data.category,
    price: formatPrice(data.price),
    priceRaw: data.price,
    seller: data.company_name || "개인",
    sellerPhone: data.contact,
    status: STATUS_MAP[data.status] || data.status,
    statusRaw: data.status,
    createdAt: data.created_at.slice(0, 10),
    views: data.views ?? 0,
    region: data.region,
    year: data.year,
    month: data.month,
    manufacturer: data.manufacturer,
    model: data.model,
    condition: data.condition,
    tonnage: data.tonnage,
    listingType: data.listing_type,
    type: data.type,
    description: data.description,
    photos: data.photos,
  };
}
