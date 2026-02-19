"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: {
  label: string;
  slug: string;
  parentId: string | null;
  categoryGroup: "heavy" | "freight";
  iconKey?: string;
}) {
  const supabase = await createClient();

  // 같은 parent 내 최대 sort_order 구하기
  let query = supabase
    .from("categories")
    .select("sort_order")
    .eq("category_group", formData.categoryGroup)
    .order("sort_order", { ascending: false })
    .limit(1);

  if (formData.parentId) {
    query = query.eq("parent_id", formData.parentId);
  } else {
    query = query.is("parent_id", null);
  }

  const { data: maxRow } = await query;
  const nextOrder = (maxRow?.[0]?.sort_order ?? 0) + 1;

  const { error } = await supabase.from("categories").insert({
    label: formData.label,
    slug: formData.slug,
    parent_id: formData.parentId,
    sort_order: nextOrder,
    category_group: formData.categoryGroup,
    icon_key: formData.iconKey || null,
  });

  if (error) throw error;

  revalidatePath("/hs-ctrl-x7k9m/categories");
  revalidatePath("/", "layout");
}

export async function updateCategory(
  id: string,
  data: {
    label?: string;
    slug?: string;
    sortOrder?: number;
    iconKey?: string;
  }
) {
  const supabase = await createClient();

  const updateData: Record<string, unknown> = {};
  if (data.label !== undefined) updateData.label = data.label;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.sortOrder !== undefined) updateData.sort_order = data.sortOrder;
  if (data.iconKey !== undefined) updateData.icon_key = data.iconKey;

  const { error } = await supabase
    .from("categories")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/hs-ctrl-x7k9m/categories");
  revalidatePath("/", "layout");
}

export async function reorderCategories(
  orderedIds: string[]
) {
  const supabase = await createClient();

  // 각 ID에 순서대로 sort_order 할당
  const updates = orderedIds.map((id, index) =>
    supabase
      .from("categories")
      .update({ sort_order: index + 1 })
      .eq("id", id)
  );

  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;

  revalidatePath("/hs-ctrl-x7k9m/categories");
  revalidatePath("/", "layout");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/hs-ctrl-x7k9m/categories");
  revalidatePath("/", "layout");
}
