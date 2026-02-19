import { FaqManager } from "@/components/admin/faqs/faq-manager";

export default function AdminFaqsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">FAQ 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          자주 묻는 질문을 추가, 수정, 삭제할 수 있습니다.
        </p>
      </div>
      <FaqManager />
    </div>
  );
}
