"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ADMIN_CATEGORIES, type AdminCategory } from "@/lib/constants/mock-admin";
import { CategoryFormDialog } from "./category-form-dialog";

function CategoryNode({
  category,
  level = 0,
  onAddChild,
}: {
  category: AdminCategory;
  level?: number;
  onAddChild: (parentLabel: string) => void;
}) {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded-md transition-colors group"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
      >
        <button
          className="cursor-pointer p-0.5 rounded hover:bg-muted"
          onClick={() => setExpanded(!expanded)}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )
          ) : (
            <span className="size-4 block" />
          )}
        </button>

        <FolderTree className="size-4 text-muted-foreground" />

        <span className="text-sm font-medium flex-1">{category.label}</span>

        <Badge variant="secondary" className="text-[11px]">
          {category.listingCount}건
        </Badge>

        <code className="text-[10px] text-muted-foreground font-mono hidden sm:block">
          {category.slug}
        </code>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-6 cursor-pointer"
            onClick={() => onAddChild(category.label)}
          >
            <Plus className="size-3" />
          </Button>
          <Button variant="ghost" size="icon" className="size-6 cursor-pointer">
            <Pencil className="size-3" />
          </Button>
          <Button variant="ghost" size="icon" className="size-6 cursor-pointer text-red-500 hover:text-red-600">
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>

      {expanded && hasChildren && (
        <div>
          {category.children!.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              level={level + 1}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryTree() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parentLabel, setParentLabel] = useState<string | undefined>();

  function handleAddChild(label?: string) {
    setParentLabel(label);
    setDialogOpen(true);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">카테고리 트리</CardTitle>
          <Button
            size="sm"
            className="cursor-pointer gap-1"
            onClick={() => handleAddChild()}
          >
            <Plus className="size-4" />
            카테고리 추가
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {MOCK_ADMIN_CATEGORIES.map((category) => (
              <CategoryNode
                key={category.id}
                category={category}
                onAddChild={handleAddChild}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        parentLabel={parentLabel}
      />
    </>
  );
}
