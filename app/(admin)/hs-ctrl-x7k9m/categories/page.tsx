import { CategoryTree } from "@/components/admin/categories/category-tree";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">카테고리관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          매물 카테고리를 관리합니다.
        </p>
      </div>
      <CategoryTree />
    </div>
  );
}
