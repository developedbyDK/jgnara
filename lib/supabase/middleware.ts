import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 세션 갱신을 위해 getUser 호출
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/hs-ctrl-x7k9m");
  const isAdminLogin = pathname === "/hs-ctrl-x7k9m/login";

  // 관리자 경로 보호 (로그인 페이지 제외)
  if (isAdminRoute && !isAdminLogin) {
    const isAdmin = user?.app_metadata?.role === "admin";
    if (!user || !isAdmin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/hs-ctrl-x7k9m/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}
