"use client";

import Link from "next/link";
import {
  UserPlus,
  PackagePlus,
  Shield,
  Image,
  Building2,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BASE = "/hs-ctrl-x7k9m";

const ACTIONS = [
  { label: "회원 관리", href: `${BASE}/users`, icon: UserPlus, variant: "default" as const },
  { label: "매물 심사", href: `${BASE}/listings`, icon: PackagePlus, variant: "default" as const },
  { label: "업체 심사", href: `${BASE}/companies`, icon: Building2, variant: "default" as const },
  { label: "신고 처리", href: `${BASE}/board`, icon: Shield, variant: "outline" as const },
  { label: "배너 관리", href: `${BASE}/banners`, icon: Image, variant: "outline" as const },
  { label: "게시판 관리", href: `${BASE}/board`, icon: FileText, variant: "outline" as const },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">빠른 액션</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            className="cursor-pointer justify-start gap-2 h-9"
            asChild
          >
            <Link href={action.href}>
              <action.icon className="size-4" />
              <span className="text-xs">{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
