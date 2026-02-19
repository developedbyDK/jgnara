"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const BASE = "/hs-ctrl-x7k9m";

const ROUTE_LABELS: Record<string, string> = {
  [BASE]: "대시보드",
  [`${BASE}/users`]: "회원관리",
  [`${BASE}/listings`]: "매물관리",
  [`${BASE}/board`]: "게시판관리",
  [`${BASE}/companies`]: "업체관리",
  [`${BASE}/recruit`]: "채용관리",
  [`${BASE}/banners`]: "배너관리",
  [`${BASE}/categories`]: "카테고리관리",
};

function getBreadcrumbs(pathname: string) {
  const crumbs: { label: string; href?: string }[] = [];

  // Find the matching base route
  const matchedRoute = Object.keys(ROUTE_LABELS)
    .filter((r) => r !== BASE)
    .find((route) => pathname.startsWith(route));

  if (matchedRoute) {
    crumbs.push({ label: ROUTE_LABELS[matchedRoute], href: matchedRoute });

    // Check for detail pages (e.g., /users/U001)
    const remaining = pathname.slice(matchedRoute.length);
    if (remaining.length > 1) {
      const detailId = remaining.replace("/", "");
      crumbs.push({ label: `상세 (${detailId})` });
    }
  } else {
    crumbs.push({ label: "대시보드" });
  }

  return crumbs;
}

const MOCK_NOTIFICATIONS = [
  { id: "1", message: "새로운 업체 등록 신청이 있습니다", time: "5분 전" },
  { id: "2", message: "매물 신고가 접수되었습니다", time: "15분 전" },
  { id: "3", message: "새 문의가 접수되었습니다", time: "1시간 전" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className="flex h-14 items-center gap-2 border-b px-4">
      <SidebarTrigger className="cursor-pointer" />
      <Separator orientation="vertical" className="h-5" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={BASE}>관리자</BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {i < crumbs.length - 1 && crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
            >
              <Bell className="size-4" />
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[10px]">
                {MOCK_NOTIFICATIONS.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            {MOCK_NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.id} className="cursor-pointer flex-col items-start gap-1">
                <span className="text-sm">{n.message}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마 전환</span>
        </Button>
      </div>
    </header>
  );
}
