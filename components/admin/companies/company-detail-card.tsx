"use client"

import { useTransition } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Crown,
  FileText,
  Printer,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { getStatusColor } from "@/lib/constants/mock-admin"
import { toggleVip, updateCompanyStatus } from "@/app/(admin)/hs-ctrl-x7k9m/(dashboard)/companies/actions"
import type { Tables } from "@/lib/supabase/database.types"

interface CompanyDetailCardProps {
  company: Tables<"companies">
}

export function CompanyDetailCard({ company }: CompanyDetailCardProps) {
  const [isPending, startTransition] = useTransition()

  function handleToggleVip() {
    startTransition(async () => {
      const result = await toggleVip(company.id, !company.is_vip)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  function handleStatusChange(status: string) {
    startTransition(async () => {
      const result = await updateCompanyStatus(company.id, status)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/companies">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{company.company_name}</h1>
            {company.is_vip && (
              <Crown className="size-5 fill-orange-400 text-orange-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground font-mono">{company.id.slice(0, 8)}</p>
        </div>
        <Badge variant="secondary" className={getStatusColor(company.status)}>
          {company.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 업체 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">업체 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">업체 분류</p>
                <p className="text-sm">{company.category}</p>
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
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">연락처</p>
                <p className="text-sm">{company.contact}</p>
              </div>
            </div>
            {company.fax && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <Printer className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">FAX</p>
                    <p className="text-sm">{company.fax}</p>
                  </div>
                </div>
              </>
            )}
            {company.website && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <Globe className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">홈페이지</p>
                    <p className="text-sm text-primary">{company.website}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 관리 / VIP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* VIP 토글 */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Crown className={`size-5 ${company.is_vip ? "fill-orange-400 text-orange-500" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-sm font-medium">VIP 업체</p>
                  <p className="text-xs text-muted-foreground">
                    VIP 업체는 업체찾기 상단 캐러셀에 노출됩니다
                  </p>
                </div>
              </div>
              <Switch
                checked={company.is_vip}
                onCheckedChange={handleToggleVip}
                disabled={isPending}
                className="cursor-pointer"
              />
            </div>

            <Separator />

            {/* 등록일 */}
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">등록일</p>
                <p className="text-sm">
                  {new Date(company.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* 업체 소개 */}
            {company.description && (
              <>
                <Separator />
                <div className="flex items-start gap-3">
                  <FileText className="size-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">업체 소개</p>
                    <p className="text-sm whitespace-pre-wrap">{company.description}</p>
                  </div>
                </div>
              </>
            )}

            {/* 로고 */}
            {company.logo_url && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-2">업체 로고</p>
                  <img
                    src={company.logo_url}
                    alt={company.company_name}
                    className="h-20 w-20 rounded-md border object-contain"
                  />
                </div>
              </>
            )}

            <Separator />

            {/* 상태 변경 버튼 */}
            <div className="flex gap-2 pt-2">
              {company.status === "심사중" && (
                <>
                  <Button
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleStatusChange("승인")}
                  >
                    승인
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleStatusChange("반려")}
                  >
                    반려
                  </Button>
                </>
              )}
              {company.status === "승인" && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleStatusChange("정지")}
                >
                  정지
                </Button>
              )}
              {company.status === "정지" && (
                <Button
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleStatusChange("승인")}
                >
                  정지 해제
                </Button>
              )}
              {company.status === "반려" && (
                <Button
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleStatusChange("승인")}
                >
                  승인
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
