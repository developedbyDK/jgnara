"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Eye, MessageSquare, Tag, Pin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type AdminBoardPostDetail } from "@/lib/admin-board-queries";
import { updatePostStatus, togglePostPin } from "@/lib/admin-board-actions";

function getStatusColor(status: string) {
  switch (status) {
    case "게시중":
      return "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "숨김":
      return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "삭제":
      return "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "";
  }
}

interface PostDetailCardProps {
  post: AdminBoardPostDetail;
}

export function PostDetailCard({ post }: PostDetailCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: string) {
    startTransition(async () => {
      await updatePostStatus(post.id, newStatus);
      router.refresh();
    });
  }

  function handleTogglePin() {
    startTransition(async () => {
      await togglePostPin(post.id, post.isPinned);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
          <Link href="/hs-ctrl-x7k9m/board">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {post.isPinned && <Pin className="inline-block size-4 mr-1 text-primary" />}
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">#{post.id}</p>
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
                <p className="text-sm">{post.boardTitle}</p>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={handleTogglePin}
                  >
                    {post.isPinned ? "공지 해제" : "공지 등록"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleStatusChange("숨김")}
                  >
                    숨김 처리
                  </Button>
                </>
              )}
              {post.status === "숨김" && (
                <>
                  <Button
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleStatusChange("게시중")}
                  >
                    게시 복원
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer flex-1"
                    disabled={isPending}
                    onClick={() => handleStatusChange("삭제")}
                  >
                    삭제
                  </Button>
                </>
              )}
              {post.status === "삭제" && (
                <Button
                  size="sm"
                  className="cursor-pointer flex-1"
                  disabled={isPending}
                  onClick={() => handleStatusChange("게시중")}
                >
                  게시 복원
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {post.content && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">본문 내용</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      )}

      {post.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">첨부 이미지 ({post.images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {post.images.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    src={url}
                    alt={`첨부 이미지 ${i + 1}`}
                    className="rounded-md border object-cover aspect-square w-full"
                  />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
