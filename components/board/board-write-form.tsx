"use client";

import { useState } from "react";
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

const DEFAULT_CATEGORIES = ["잡담", "질문", "정보공유", "후기", "기타"];

interface FormData {
  title: string;
  category: string;
  author: string;
  password: string;
  content: string;
}

const initialFormData: FormData = {
  title: "",
  category: "",
  author: "",
  password: "",
  content: "",
};

interface BoardWriteFormProps {
  categories?: string[];
  backUrl?: string;
}

export function BoardWriteForm({
  categories = DEFAULT_CATEGORIES,
  backUrl = "/board",
}: BoardWriteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit logic
    console.log({ formData });
    router.push(backUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 게시글 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">게시글 정보</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel>제목</FieldLabel>
            <Input
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </Field>

          <Field>
            <FieldLabel>분류</FieldLabel>
            <Select
              value={formData.category}
              onValueChange={(v) => updateField("category", v)}
            >
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
              value={formData.author}
              onChange={(e) => updateField("author", e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </Field>

          <Field>
            <FieldLabel>비밀번호</FieldLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="수정/삭제 시 필요합니다"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 내용 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">내용</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>본문</FieldLabel>
            <Textarea
              value={formData.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="내용을 입력하세요"
              className="min-h-48"
            />
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
        >
          취소
        </Button>
        <Button type="submit" className="cursor-pointer px-8">
          등록하기
        </Button>
      </div>
    </form>
  );
}
