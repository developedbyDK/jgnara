import { createClient } from "@/lib/supabase/server";

export interface CategoryRow {
  id: string;
  label: string;
  slug: string;
  parent_id: string | null;
  sort_order: number;
  category_group: "heavy" | "freight";
  icon_key: string | null;
}

export interface CategoryTreeNode extends CategoryRow {
  children: CategoryTreeNode[];
}

/** 전체 카테고리 flat 목록 조회 */
export async function fetchCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as CategoryRow[];
}

/** flat 목록을 트리 구조로 변환 */
export function buildCategoryTree(rows: CategoryRow[]): CategoryTreeNode[] {
  const map = new Map<string, CategoryTreeNode>();
  const roots: CategoryTreeNode[] = [];

  for (const row of rows) {
    map.set(row.id, { ...row, children: [] });
  }

  for (const node of map.values()) {
    if (node.parent_id && map.has(node.parent_id)) {
      map.get(node.parent_id)!.children.push(node);
    } else if (!node.parent_id) {
      roots.push(node);
    }
  }

  return roots;
}

/** 그룹별 트리 조회 */
export async function fetchCategoryTree(group?: "heavy" | "freight") {
  const rows = await fetchCategories();
  const filtered = group ? rows.filter((r) => r.category_group === group) : rows;
  return buildCategoryTree(filtered);
}

/** slug로 카테고리 조회 */
export async function fetchCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .is("parent_id", null)
    .single();

  if (error) return null;
  return data as CategoryRow;
}

/** 하위 카테고리를 slug + parent_id 로 조회 */
export async function fetchSubcategoryBySlug(
  subSlug: string,
  parentId: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", subSlug)
    .eq("parent_id", parentId)
    .single();

  if (error) return null;
  return data as CategoryRow;
}
