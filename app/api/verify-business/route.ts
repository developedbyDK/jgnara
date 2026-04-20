import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { b_no } = await request.json();

    if (!b_no || typeof b_no !== "string") {
      return NextResponse.json(
        { error: "사업자등록번호를 입력해주세요." },
        { status: 400 },
      );
    }

    // 하이픈 제거 후 숫자 10자리 검증
    const cleaned = b_no.replace(/-/g, "");
    if (!/^\d{10}$/.test(cleaned)) {
      return NextResponse.json(
        { error: "사업자등록번호는 10자리 숫자여야 합니다." },
        { status: 400 },
      );
    }

    const serviceKey = process.env.NTS_API_SERVICE_KEY;
    if (!serviceKey) {
      return NextResponse.json(
        { error: "서비스 키가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ b_no: [cleaned] }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "국세청 API 요청에 실패했습니다." },
        { status: 502 },
      );
    }

    const data = await res.json();

    if (
      data.status_code !== "OK" ||
      !data.data ||
      data.data.length === 0
    ) {
      return NextResponse.json(
        { error: "사업자등록번호 조회 결과가 없습니다." },
        { status: 404 },
      );
    }

    const result = data.data[0];

    // b_stt_cd: "01" 계속사업자, "02" 휴업자, "03" 폐업자
    return NextResponse.json({
      valid: result.b_stt_cd === "01",
      b_no: result.b_no,
      b_stt: result.b_stt,
      b_stt_cd: result.b_stt_cd,
      tax_type: result.tax_type,
    });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
