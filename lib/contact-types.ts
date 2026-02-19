// ── Types ──

export type ContactStatus = "대기" | "답변완료" | "보류";

export type AdminContactView = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: ContactStatus;
  adminNote: string | null;
  createdAt: string;
};

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  general: "일반 문의",
  listing: "매물 관련",
  company: "업체등록 관련",
  recruit: "구인/구직 관련",
  payment: "결제/환불 관련",
  report: "신고/제보",
  partnership: "제휴/협력",
  other: "기타",
};

export function getInquiryTypeLabel(type: string) {
  return INQUIRY_TYPE_LABELS[type] ?? type;
}
