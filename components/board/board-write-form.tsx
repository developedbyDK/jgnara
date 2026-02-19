"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BoardImageUpload } from "@/components/board/board-image-upload";
import { createBoardPost } from "@/lib/board-actions";

const DEFAULT_CATEGORIES = ["잡담", "질문", "정보공유", "후기", "기타"];

interface BoardWriteFormProps {
  boardSlug: string;
  categories?: string[];
  backUrl?: string;
}

export function BoardWriteForm({
  boardSlug,
  categories = DEFAULT_CATEGORIES,
  backUrl = "/board",
}: BoardWriteFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    async (_prev: { success: boolean; message: string } | null, formData: FormData) => {
      // 이미지 URL을 formData에 추가
      for (const url of images) {
        formData.append("images", url);
      }
      const result = await createBoardPost(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="boardSlug" value={boardSlug} />

      {/* 에러 메시지 */}
      {state && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400">
          {state.message}
        </div>
      )}

      {/* ── 게시글 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">게시글 정보</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel>제목</FieldLabel>
            <Input
              name="title"
              placeholder="제목을 입력하세요"
              required
            />
          </Field>

          <Field>
            <FieldLabel>분류</FieldLabel>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="분류 선택" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 작성자 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">작성자 정보</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>작성자</FieldLabel>
            <Input
              name="author"
              placeholder="닉네임을 입력하세요"
              required
            />
          </Field>

          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <Input
              type="password"
              name="password"
              placeholder="수정/삭제 시 필요합니다"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 내용 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">내용</h2>
        <FieldGroup className="space-y-5">
          <Field>
            <FieldLabel>본문</FieldLabel>
            <Textarea
              name="content"
              placeholder="내용을 입력하세요"
              className="min-h-48"
              required
            />
          </Field>

          <Field>
            <FieldLabel>이미지 첨부</FieldLabel>
            <BoardImageUpload images={images} onChange={setImages} />
          </Field>
        </FieldGroup>
      </section>

      {/* ── 버튼 ── */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer px-6"
          onClick={() => router.push(backUrl)}
          disabled={isPending}
        >
          취소
        </Button>
        <Button type="submit" className="cursor-pointer px-8" disabled={isPending}>
          {isPending ? "등록 중..." : "등록하기"}
        </Button>
      </div>
    </form>
  );
}
