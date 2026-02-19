"use client";

import Link from "next/link";
import { ArrowLeft, User, Calendar, Eye, MessageSquare, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type AdminPost, getStatusColor } from "@/lib/constants/mock-admin";

interface PostDetailCardProps {
  post: AdminPost;
}

export function PostDetailCard({ post }: PostDetailCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/board">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-sm text-muted-foreground">{post.id}</p>
        </div>
        <Badge variant="secondary" className={getStatusColor(post.status)}>
          {post.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">게시글 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Tag className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">게시판</p>
                <p className="text-sm">{post.board}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Tag className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">카테고리</p>
                <p className="text-sm">{post.category}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <User className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">작성자</p>
                <p className="text-sm">{post.author}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">작성일</p>
                <p className="text-sm">{post.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">통계 / 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <Eye className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-2xl font-bold">{post.views.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">조회수</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <MessageSquare className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-2xl font-bold">{post.comments}</p>
                <p className="text-xs text-muted-foreground mt-1">댓글</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2 pt-2">
              {post.status === "게시중" && (
                <>
                  <Button variant="outline" size="sm" className="cursor-pointer flex-1">
                    공지 등록
                  </Button>
                  <Button variant="destructive" size="sm" className="cursor-pointer flex-1">
                    숨김 처리
                  </Button>
                </>
              )}
              {post.status === "숨김" && (
                <>
                  <Button size="sm" className="cursor-pointer flex-1">
                    게시 복원
                  </Button>
                  <Button variant="destructive" size="sm" className="cursor-pointer flex-1">
                    삭제
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
