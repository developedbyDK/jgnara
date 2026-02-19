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
    const supabase = getServiceClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("ad_purchases")
      .select(
        "*, ad_products(name, slug, ad_zone), profiles!ad_purchases_user_id_profiles_fkey(full_name, email)"
      )
      .order("created_at", { ascending: false });

    if (status && status !== "전체") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = getServiceClient();
    const body = await request.json();
    const { id, action, admin_note } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: "ID와 action이 필요합니다." },
        { status: 400 }
      );
    }

    if (action === "approve") {
      const { data, error } = await supabase.rpc("approve_ad_purchase", {
        p_purchase_id: id,
        p_admin_note: admin_note || null,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    if (action === "reject") {
      const { data, error } = await supabase.rpc("reject_ad_purchase", {
        p_purchase_id: id,
        p_admin_note: admin_note || null,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "유효하지 않은 action입니다." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
