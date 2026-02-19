"use client";

import Link from "next/link";
import { ArrowLeft, Building2, User, Phone, Mail, MapPin, FileText, Calendar, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type AdminCompany, getStatusColor } from "@/lib/constants/mock-admin";

interface CompanyDetailCardProps {
  company: AdminCompany;
}

export function CompanyDetailCard({ company }: CompanyDetailCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/companies">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-sm text-muted-foreground">{company.id}</p>
        </div>
        <Badge variant="secondary" className={getStatusColor(company.status)}>
          {company.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">업체 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">업체 유형</p>
                <p className="text-sm">{company.type}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <User className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">대표자</p>
                <p className="text-sm">{company.representative}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <FileText className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">사업자번호</p>
                <p className="text-sm font-mono">{company.businessNumber}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">주소</p>
                <p className="text-sm">{company.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">연락처 / 현황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">전화번호</p>
                <p className="text-sm">{company.phone}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">이메일</p>
                <p className="text-sm">{company.email}</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <Package className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-2xl font-bold">{company.listingCount}</p>
                <p className="text-xs text-muted-foreground mt-1">등록 매물</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <Calendar className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold">{company.registeredAt}</p>
                <p className="text-xs text-muted-foreground mt-1">등록일</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2 pt-2">
              {company.status === "심사중" && (
                <>
                  <Button size="sm" className="cursor-pointer flex-1">승인</Button>
                  <Button variant="destructive" size="sm" className="cursor-pointer flex-1">반려</Button>
                </>
              )}
              {company.status === "승인" && (
                <Button variant="destructive" size="sm" className="cursor-pointer flex-1">정지</Button>
              )}
              {company.status === "정지" && (
                <Button size="sm" className="cursor-pointer flex-1">정지 해제</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
