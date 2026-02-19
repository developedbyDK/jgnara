"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Eye, Tag, User, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type AdminListing, getStatusColor } from "@/lib/constants/mock-admin";

interface ListingDetailCardProps {
  listing: AdminListing;
}

export function ListingDetailCard({ listing }: ListingDetailCardProps) {
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
          <p className="text-sm text-muted-foreground">{listing.id}</p>
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
              <div className="size-4 flex items-center justify-center text-muted-foreground font-bold text-xs">₩</div>
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
                <p className="text-sm">{listing.year}년</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">등급</p>
                <p className="text-sm font-medium">{listing.grade}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">등록 유형</p>
                <Badge variant="outline" className="text-xs">{listing.listingType}</Badge>
              </div>
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
              {listing.status === "심사중" && (
                <>
                  <Button size="sm" className="cursor-pointer flex-1">승인</Button>
                  <Button variant="destructive" size="sm" className="cursor-pointer flex-1">반려</Button>
                </>
              )}
              {listing.status === "판매중" && (
                <Button variant="destructive" size="sm" className="cursor-pointer flex-1">판매 중지</Button>
              )}
              {listing.status === "반려" && (
                <Button size="sm" className="cursor-pointer flex-1">재심사</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
