import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = ["pdf", "docx", "xlsx", "hwp", "zip"];
    if (!allowed.includes(ext)) {
      return NextResponse.json(
        { error: "허용되지 않는 파일 형식입니다." },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();
    const filePath = `${randomUUID()}_${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("forms")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      return NextResponse.json(
        { error: `업로드 실패: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ filePath, fileSize: file.size });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
