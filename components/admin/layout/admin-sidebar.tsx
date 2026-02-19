"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  Building2,
  Briefcase,
  Image,
  FolderTree,
  ChevronUp,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BASE = "/hs-ctrl-x7k9m";

const NAV_GROUPS = [
  {
    label: "메인",
    items: [
      { title: "대시보드", href: BASE, icon: LayoutDashboard },
      { title: "회원관리", href: `${BASE}/users`, icon: Users },
      { title: "매물관리", href: `${BASE}/listings`, icon: Package },
    ],
  },
  {
    label: "콘텐츠",
    items: [
      { title: "게시판관리", href: `${BASE}/board`, icon: MessageSquare },
      { title: "업체관리", href: `${BASE}/companies`, icon: Building2 },
      { title: "채용관리", href: `${BASE}/recruit`, icon: Briefcase },
    ],
  },
  {
    label: "설정",
    items: [
      { title: "배너관리", href: `${BASE}/banners`, icon: Image },
      { title: "카테고리관리", href: `${BASE}/categories`, icon: FolderTree },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === BASE) return pathname === BASE;
    return pathname.startsWith(href);
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="h-14 flex-row items-center border-b px-4">
        <Link
          href={BASE}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
            중
          </div>
          <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
            중기in 관리자
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.title}
                    >
                      <Link
                        href={item.href}
                        className="cursor-pointer"
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="cursor-pointer"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      관
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                    <span className="text-xs font-semibold">관리자</span>
                    <span className="text-[10px] text-muted-foreground">
                      admin@jungki.in
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 size-4" />
                  설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 size-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
