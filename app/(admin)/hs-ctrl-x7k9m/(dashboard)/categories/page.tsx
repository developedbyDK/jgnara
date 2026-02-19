import { CategoryTree } from "@/components/admin/categories/category-tree";
import { fetchCategories, buildCategoryTree } from "@/lib/category-queries";

export default async function CategoriesPage() {
  const rows = await fetchCategories();
  const tree = buildCategoryTree(rows);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">카테고리관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          매물 카테고리를 관리합니다. 변경사항은 사이드바와 매물등록 화면에 즉시
          반영됩니다.
        </p>
      </div>
      <CategoryTree initialTree={tree} />
    </div>
  );
}
