"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building2, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  type AdminUser,
  getStatusColor,
  getRoleColor,
} from "@/lib/constants/mock-admin";

interface UserDetailCardProps {
  user: AdminUser;
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/users">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.id}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="secondary" className={getRoleColor(user.role)}>
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
                <p className="text-sm">{user.phone}</p>
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
                <p className="text-sm">{user.registeredAt}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">마지막 로그인</p>
                <p className="text-sm">{user.lastLoginAt}</p>
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
                <p className="text-2xl font-bold">{user.listingCount}</p>
                <p className="text-xs text-muted-foreground mt-1">등록 매물</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold">{user.postCount}</p>
                <p className="text-xs text-muted-foreground mt-1">작성 게시글</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="cursor-pointer flex-1">
                비밀번호 초기화
              </Button>
              {user.status === "활성" ? (
                <Button variant="destructive" size="sm" className="cursor-pointer flex-1">
                  계정 정지
                </Button>
              ) : user.status === "정지" ? (
                <Button variant="default" size="sm" className="cursor-pointer flex-1">
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
