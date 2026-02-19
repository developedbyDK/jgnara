"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function toggleVip(companyId: string, isVip: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("companies")
    .update({ is_vip: isVip })
    .eq("id", companyId)

  if (error) {
    return { success: false, message: "VIP 설정 변경에 실패했습니다." }
  }

  revalidatePath("/hs-ctrl-x7k9m/companies")
  return { success: true, message: isVip ? "VIP로 설정되었습니다." : "VIP가 해제되었습니다." }
}

export async function updateCompanyStatus(companyId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("companies")
    .update({ status })
    .eq("id", companyId)

  if (error) {
    return { success: false, message: "상태 변경에 실패했습니다." }
  }

  revalidatePath("/hs-ctrl-x7k9m/companies")
  revalidatePath(`/hs-ctrl-x7k9m/companies/${companyId}`)
  return { success: true, message: `상태가 '${status}'(으)로 변경되었습니다.` }
}
