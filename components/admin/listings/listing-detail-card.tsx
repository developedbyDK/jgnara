"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Eye, Tag, User, Phone, Wrench, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getStatusColor } from "@/lib/constants/mock-admin";
import { updateListingStatus } from "@/lib/listing-actions";
import type { AdminListingDetail } from "@/lib/listing-queries";

interface ListingDetailCardProps {
  listing: AdminListingDetail;
}

export function ListingDetailCard({ listing }: ListingDetailCardProps) {
  const [isPending, startTransition] = useTransition();

  function handleAction(dbStatus: string) {
    startTransition(async () => {
      await updateListingStatus(listing.id, dbStatus);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/listings">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <p className="text-sm text-muted-foreground font-mono">{listing.id.slice(0, 8)}</p>
        </div>
        <Badge variant="secondary" className={getStatusColor(listing.status)}>
          {listing.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">매물 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Tag className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">카테고리</p>
                <p className="text-sm">{listing.category}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <div className="size-4 flex items-center justify-center text-muted-foreground font-bold text-xs">&#8361;</div>
              <div>
                <p className="text-xs text-muted-foreground">가격</p>
                <p className="text-sm font-semibold">{listing.price}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">지역</p>
                <p className="text-sm">{listing.region}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">연식</p>
                <p className="text-sm">{listing.year}년 {listing.month}월</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Wrench className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">상태</p>
                  <p className="text-sm font-medium">{listing.condition}</p>
                </div>
              </div>
              {listing.tonnage && (
                <div className="flex items-center gap-3">
                  <Weight className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">톤수</p>
                    <p className="text-sm font-medium">{listing.tonnage}톤</p>
                  </div>
                </div>
              )}
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">제조사</p>
                <p className="text-sm font-medium">{listing.manufacturer}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">모델</p>
                <p className="text-sm font-medium">{listing.model}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">등록 유형</p>
              <Badge variant="outline" className="text-xs mt-1">{listing.listingType === "free" ? "무료" : "유료"}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">판매자 / 통계</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">판매자</p>
                <p className="text-sm">{listing.seller}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">연락처</p>
                <p className="text-sm">{listing.sellerPhone}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Eye className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">조회수</p>
                <p className="text-sm">{listing.views.toLocaleString()}회</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">등록일</p>
                <p className="text-sm">{listing.createdAt}</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2 pt-2">
              {listing.statusRaw === "pending" && (
                <>
                  <Button
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleAction("active")}
                  >
                    승인
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleAction("rejected")}
                  >
                    반려
                  </Button>
                </>
              )}
              {listing.statusRaw === "active" && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleAction("deleted")}
                >
                  판매 중지
                </Button>
              )}
              {listing.statusRaw === "rejected" && (
                <Button
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleAction("pending")}
                >
                  재심사
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
