import { UserTable } from "@/components/admin/users/user-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">회원관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          등록된 회원을 관리합니다.
        </p>
      </div>
      <UserTable />
    </div>
  );
}
