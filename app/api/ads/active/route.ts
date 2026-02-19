import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

function getServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get("zone");

    if (!zone) {
      return NextResponse.json(
        { error: "zone 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("ad_purchases")
      .select(
        "id, banner_image_url, link_url, starts_at, ends_at, ad_products!inner(name, slug, ad_zone)"
      )
      .eq("status", "진행중")
      .gte("ends_at", now)
      .lte("starts_at", now)
      .eq("ad_products.ad_zone", zone)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
