import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

function getServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("ad_products")
      .select("*")
      .order("sort_order", { ascending: true });

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

export async function POST(request: Request) {
  try {
    const supabase = getServiceClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("ad_products")
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description ?? "",
        icon_key: body.icon_key ?? "layout-board",
        ad_zone: body.ad_zone ?? "main-banner",
        credit_cost_monthly: body.credit_cost_monthly,
        credit_cost_2month: body.credit_cost_2month,
        credit_cost_3month: body.credit_cost_3month,
        credit_cost_6month: body.credit_cost_6month,
        credit_cost_yearly: body.credit_cost_yearly,
        is_active: body.is_active ?? true,
        sort_order: body.sort_order ?? 0,
      })
      .select()
      .single();

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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("ad_products")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

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

export async function DELETE(request: Request) {
  try {
    const supabase = getServiceClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
    }

    const { error } = await supabase
      .from("ad_products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
