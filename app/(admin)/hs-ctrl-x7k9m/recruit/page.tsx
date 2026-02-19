import { RecruitTable } from "@/components/admin/recruit/recruit-table";

export default function RecruitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">채용관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          채용 공고를 관리합니다.
        </p>
      </div>
      <RecruitTable />
    </div>
  );
}
