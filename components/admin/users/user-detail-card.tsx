"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getStatusColor,
  getRoleColor,
  type UserRole,
} from "@/lib/constants/mock-admin";
import type { AdminUserRow } from "@/app/(admin)/hs-ctrl-x7k9m/(dashboard)/users/actions";
import {
  updateUserStatus,
  updateUserRole,
} from "@/app/(admin)/hs-ctrl-x7k9m/(dashboard)/users/actions";

interface UserDetailCardProps {
  user: AdminUserRow;
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleStatusChange(status: "활성" | "정지" | "탈퇴") {
    const result = await updateUserStatus(user.id, status);
    if (result.success) {
      startTransition(() => {
        router.refresh();
      });
    }
  }

  async function handleRoleChange(role: "일반" | "업체" | "VIP" | "관리자") {
    const result = await updateUserRole(user.id, role);
    if (result.success) {
      startTransition(() => {
        router.refresh();
      });
    }
  }

  return (
    <div className={`space-y-6 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/users">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{user.full_name || "(이름 없음)"}</h1>
          <p className="text-sm text-muted-foreground font-mono">{user.id.slice(0, 8)}...</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="secondary" className={getRoleColor(user.role as UserRole)}>
            {user.role}
          </Badge>
          <Badge variant="secondary" className={getStatusColor(user.status)}>
            {user.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">이메일</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">전화번호</p>
                <p className="text-sm">{user.phone || "-"}</p>
              </div>
            </div>
            <Separator />
            {user.company && (
              <>
                <div className="flex items-center gap-3">
                  <Building2 className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">소속 업체</p>
                    <p className="text-sm">{user.company}</p>
                  </div>
                </div>
                <Separator />
              </>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">가입일</p>
                <p className="text-sm">{formatDate(user.created_at)}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">마지막 로그인</p>
                <p className="text-sm">{formatDateTime(user.last_sign_in_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">활동 현황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold">{user.listing_count}</p>
                <p className="text-xs text-muted-foreground mt-1">등록 매물</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold">{user.post_count}</p>
                <p className="text-xs text-muted-foreground mt-1">작성 게시글</p>
              </div>
            </div>

            <Separator />

            {/* Role management */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">역할 변경</p>
              <div className="flex gap-1.5 flex-wrap">
                {(["일반", "업체", "VIP", "관리자"] as const).map((role) => (
                  <Button
                    key={role}
                    variant={user.role === role ? "default" : "outline"}
                    size="sm"
                    className="cursor-pointer text-xs"
                    onClick={() => handleRoleChange(role)}
                    disabled={user.role === role}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              {user.status === "활성" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer flex-1"
                  onClick={() => handleStatusChange("정지")}
                >
                  계정 정지
                </Button>
              ) : user.status === "정지" ? (
                <Button
                  variant="default"
                  size="sm"
                  className="cursor-pointer flex-1"
                  onClick={() => handleStatusChange("활성")}
                >
                  정지 해제
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
