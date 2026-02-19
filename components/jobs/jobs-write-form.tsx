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

const CATEGORIES = ["운전기사", "정비사", "현장관리", "사무직", "기타"];
const REGIONS = [
  "서울", "경기", "인천", "충남", "충북",
  "전남", "전북", "경남", "경북", "강원", "제주",
];

interface FormData {
  title: string;
  name: string;
  category: string;
  region: string;
  experience: string;
  desiredSalary: string;
  contact: string;
  description: string;
}

const initialFormData: FormData = {
  title: "",
  name: "",
  category: "",
  region: "",
  experience: "",
  desiredSalary: "",
  contact: "",
  description: "",
};

export function JobsWriteForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit logic
    console.log({ formData });
    router.push("/jobs");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── 기본 정보 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">기본 정보</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel>제목</FieldLabel>
            <Input
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="구직 제목을 입력하세요"
            />
          </Field>

          <Field>
            <FieldLabel>이름</FieldLabel>
            <Input
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="이름 (예: 홍길동)"
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
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>지역</FieldLabel>
            <Select
              value={formData.region}
              onValueChange={(v) => updateField("region", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>경력</FieldLabel>
            <Input
              value={formData.experience}
              onChange={(e) => updateField("experience", e.target.value)}
              placeholder="예: 5년"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 희망 조건 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">희망 조건</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>희망급여</FieldLabel>
            <Input
              value={formData.desiredSalary}
              onChange={(e) => updateField("desiredSalary", e.target.value)}
              placeholder="예: 월 400만원~"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 연락처 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">연락처</h2>
        <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>연락처</FieldLabel>
            <Input
              value={formData.contact}
              onChange={(e) => updateField("contact", e.target.value)}
              placeholder="010-0000-0000"
            />
          </Field>
        </FieldGroup>
      </section>

      <Separator />

      {/* ── 상세 내용 ── */}
      <section>
        <h2 className="mb-4 text-base font-semibold">상세 내용</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>자기소개 / 경력사항</FieldLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="경력사항, 보유 자격증, 가능 장비 등을 자유롭게 작성해주세요"
              className="min-h-40"
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
          onClick={() => router.push("/jobs")}
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
