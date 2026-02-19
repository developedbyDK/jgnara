import { FormDocumentManager } from "@/components/admin/forms/form-document-manager";

export default function FormsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">주요양식관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          다운로드 양식 파일을 관리합니다.
        </p>
      </div>
      <FormDocumentManager />
    </div>
  );
}
