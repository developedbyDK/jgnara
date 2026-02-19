import { createClient } from "@/lib/supabase/server"
import { CompanyTable } from "@/components/admin/companies/company-table"

export default async function CompaniesPage() {
  const supabase = await createClient()

  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">업체관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          등록된 업체를 관리하고 심사합니다.
        </p>
      </div>
      <CompanyTable companies={companies ?? []} />
    </div>
  )
}
