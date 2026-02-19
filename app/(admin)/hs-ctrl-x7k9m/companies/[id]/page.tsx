import { notFound } from "next/navigation";
import { MOCK_COMPANIES } from "@/lib/constants/mock-admin";
import { CompanyDetailCard } from "@/components/admin/companies/company-detail-card";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = MOCK_COMPANIES.find((c) => c.id === id);

  if (!company) notFound();

  return <CompanyDetailCard company={company} />;
}
