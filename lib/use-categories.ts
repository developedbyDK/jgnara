"use client";

import { useEffect, useState } from "react";
import type { CategoryRow, CategoryTreeNode } from "./category-queries";

function buildTree(rows: CategoryRow[]): CategoryTreeNode[] {
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

let cachedRows: CategoryRow[] | null = null;
let fetchPromise: Promise<CategoryRow[]> | null = null;

function fetchCategoriesClient(): Promise<CategoryRow[]> {
  if (cachedRows) return Promise.resolve(cachedRows);
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/categories")
    .then((res) => res.json())
    .then((data: CategoryRow[]) => {
      cachedRows = data;
      fetchPromise = null;
      return data;
    })
    .catch((err) => {
      fetchPromise = null;
      throw err;
    });

  return fetchPromise;
}

/** 캐시 무효화 (CRUD 후 호출) */
export function invalidateCategoryCache() {
  cachedRows = null;
  fetchPromise = null;
}

/** 클라이언트에서 카테고리 조회 (캐시 포함) */
export function useCategories() {
  const [rows, setRows] = useState<CategoryRow[]>(cachedRows ?? []);
  const [loading, setLoading] = useState(!cachedRows);

  useEffect(() => {
    fetchCategoriesClient()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  const heavyTree = buildTree(rows.filter((r) => r.category_group === "heavy"));
  const freightTree = buildTree(rows.filter((r) => r.category_group === "freight"));
  const allTree = buildTree(rows);

  return { rows, heavyTree, freightTree, allTree, loading };
}

/** 분류1(부모) / 분류2(자식) 계층형 옵션 (매물등록 폼용) */
export function useHierarchicalCategories() {
  const { rows, loading } = useCategories();

  // 분류1: 부모 카테고리 (parent_id가 null인 것)
  const parentOptions = rows
    .filter((r) => !r.parent_id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => ({ value: r.id, label: r.label, group: r.category_group }));

  // 분류2: 선택된 부모의 자식 카테고리
  function getChildOptions(parentId: string) {
    return rows
      .filter((r) => r.parent_id === parentId)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((r) => ({ value: r.id, label: r.label }));
  }

  // id → label 조회
  function getLabelById(id: string) {
    return rows.find((r) => r.id === id)?.label ?? "";
  }

  // label → id 역매핑 (수정 폼에서 DB label을 Select value로 변환)
  function getIdByLabel(label: string) {
    return rows.find((r) => r.label === label)?.id ?? "";
  }

  // id → category_group 조회
  function getGroupById(id: string) {
    return rows.find((r) => r.id === id)?.category_group ?? "";
  }

  // id → parent_id 조회
  function getParentId(id: string) {
    return rows.find((r) => r.id === id)?.parent_id ?? null;
  }

  return { parentOptions, getChildOptions, getLabelById, getIdByLabel, getGroupById, getParentId, loading };
}
