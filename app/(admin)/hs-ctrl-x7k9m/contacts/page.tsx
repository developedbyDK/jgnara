import { getContacts } from "@/lib/contact-queries";
import { ContactTable } from "@/components/admin/contacts/contact-table";

export const metadata = { title: "문의관리 - 관리자" };

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">문의관리</h1>
        <p className="text-sm text-muted-foreground">
          고객 문의를 확인하고 답변 상태를 관리합니다.
        </p>
      </div>
      <ContactTable contacts={contacts} />
    </div>
  );
}
