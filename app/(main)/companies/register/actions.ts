"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterCompanyState = {
  success: boolean
  message: string
} | null

export async function registerCompany(
  _prev: RegisterCompanyState,
  formData: FormData
): Promise<RegisterCompanyState> {
  const category = formData.get("category") as string
  const password = formData.get("password") as string
  const companyName = formData.get("companyName") as string
  const address = formData.get("address") as string
  const contact = formData.get("contact") as string
  const fax = formData.get("fax") as string | null
  const website = formData.get("website") as string | null
  const description = formData.get("description") as string | null
  const logo = formData.get("logo") as File | null

  // Validation
  if (!category || !password || !companyName || !address || !contact) {
    return { success: false, message: "필수 항목을 모두 입력해주세요." }
  }

  const supabase = await createClient()

  // Get current user (optional - 비회원도 등록 가능)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let logoUrl: string | null = null

  // Upload logo if provided
  if (logo && logo.size > 0) {
    const fileName = `${crypto.randomUUID()}.webp`

    const { error: uploadError } = await supabase.storage
      .from("company-logos")
      .upload(fileName, logo)

    if (uploadError) {
      return { success: false, message: "로고 업로드에 실패했습니다." }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("company-logos").getPublicUrl(fileName)

    logoUrl = publicUrl
  }

  // Insert company
  const { error } = await supabase.from("companies").insert({
    user_id: user?.id ?? null,
    category,
    password,
    company_name: companyName,
    address,
    contact,
    fax: fax || null,
    website: website || null,
    description: description || null,
    logo_url: logoUrl,
  })

  if (error) {
    return { success: false, message: "업체 등록에 실패했습니다. 다시 시도해주세요." }
  }

  return { success: true, message: "업체 등록이 완료되었습니다. 관리자 승인 후 노출됩니다." }
}
