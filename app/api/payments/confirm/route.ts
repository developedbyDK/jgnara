import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const encryptedSecretKey = Buffer.from(TOSS_SECRET_KEY + ":").toString(
      "base64"
    );

    const tossResponse = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encryptedSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      }
    );

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      return NextResponse.json(
        { error: tossData.message || "결제 승인에 실패했습니다." },
        { status: tossResponse.status }
      );
    }

    // Supabase service role client (RLS 우회)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 트랜잭션 조회
    const { data: transaction, error: txError } = await supabase
      .from("credit_transactions")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (txError || !transaction) {
      return NextResponse.json(
        { error: "거래 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 금액 검증
    if (transaction.payment_amount !== amount) {
      return NextResponse.json(
        { error: "결제 금액이 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 이미 승인된 거래인지 확인
    if (transaction.status === "confirmed") {
      return NextResponse.json(
        { error: "이미 처리된 결제입니다." },
        { status: 409 }
      );
    }

    // 트랜잭션 상태 업데이트
    const { error: updateTxError } = await supabase
      .from("credit_transactions")
      .update({
        status: "confirmed",
        payment_key: paymentKey,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", transaction.id);

    if (updateTxError) {
      return NextResponse.json(
        { error: "거래 상태 업데이트에 실패했습니다." },
        { status: 500 }
      );
    }

    // 포인트 충전 (profiles.credits 증가)
    const { error: creditError } = await supabase.rpc("increment_credits", {
      p_user_id: transaction.user_id,
      p_amount: transaction.credits_amount,
    });

    if (creditError) {
      // RPC 실패 시 직접 업데이트
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", transaction.user_id)
        .single();

      const currentCredits = profile?.credits ?? 0;

      await supabase
        .from("profiles")
        .update({ credits: currentCredits + transaction.credits_amount })
        .eq("id", transaction.user_id);
    }

    return NextResponse.json({
      success: true,
      credits: transaction.credits_amount,
      packageId: transaction.package_id,
    });
  } catch (error) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { error: "결제 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
