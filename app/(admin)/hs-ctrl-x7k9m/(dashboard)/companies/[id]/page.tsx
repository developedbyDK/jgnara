import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CompanyDetailCard } from "@/components/admin/companies/company-detail-card"

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single()

  if (!company) notFound()

  return <CompanyDetailCard company={company} />
}
