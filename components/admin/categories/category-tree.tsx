"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { toast } from "sonner";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  FolderTree,
  GripVertical,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CategoryFormDialog } from "./category-form-dialog";
import { deleteCategory, reorderCategories } from "@/lib/category-actions";
import type { CategoryTreeNode } from "@/lib/category-queries";

function CategoryNode({
  category,
  level = 0,
  onAddChild,
  onEdit,
  onDelete,
  // drag-and-drop props (하위 카테고리만)
  draggable: isDraggable,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragOver,
}: {
  category: CategoryTreeNode;
  level?: number;
  onAddChild: (parentId: string, parentLabel: string) => void;
  onEdit: (category: CategoryTreeNode) => void;
  onDelete: (id: string, label: string) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDragOver?: boolean;
}) {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = category.children.length > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted/50 ${
          isDragOver ? "bg-primary/10 border-t-2 border-primary" : ""
        }`}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
      >
        {isDraggable && (
          <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing" />
        )}

        <button
          className="cursor-pointer rounded p-0.5 hover:bg-muted"
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
            <span className="block size-4" />
          )}
        </button>

        <FolderTree className="size-4 text-muted-foreground" />

        <span className="flex-1 text-sm font-medium">{category.label}</span>

        <code className="hidden font-mono text-[10px] text-muted-foreground sm:block">
          {category.slug}
        </code>

        <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          {/* 하위 추가는 부모(root) 레벨에서만 */}
          {!category.parent_id && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6 cursor-pointer"
              onClick={() => onAddChild(category.id, category.label)}
            >
              <Plus className="size-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="size-6 cursor-pointer"
            onClick={() => onEdit(category)}
          >
            <Pencil className="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => onDelete(category.id, category.label)}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>

      {expanded && hasChildren && (
        <DraggableChildren
          parent={category}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

/** 하위 카테고리 드래그 정렬을 관리하는 래퍼 */
function DraggableChildren({
  parent,
  onAddChild,
  onEdit,
  onDelete,
}: {
  parent: CategoryTreeNode;
  onAddChild: (parentId: string, parentLabel: string) => void;
  onEdit: (category: CategoryTreeNode) => void;
  onDelete: (id: string, label: string) => void;
}) {
  const [children, setChildren] = useState(parent.children);

  // 서버에서 revalidate된 데이터 반영 (수정/추가/삭제 후 즉시 갱신)
  useEffect(() => {
    setChildren(parent.children);
  }, [parent.children]);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const dragRef = useRef<number | null>(null);

  function handleDragStart(e: React.DragEvent, idx: number) {
    dragRef.current = idx;
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    // 드래그 중 반투명 효과
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.4";
    }
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIdx(idx);
  }

  function handleDragEnd(e: React.DragEvent) {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDragIdx(null);
    setOverIdx(null);
  }

  function handleDrop(e: React.DragEvent, dropIdx: number) {
    e.preventDefault();
    const fromIdx = dragRef.current;
    if (fromIdx === null || fromIdx === dropIdx) {
      setOverIdx(null);
      return;
    }

    const updated = [...children];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(dropIdx, 0, moved);
    setChildren(updated);
    setOverIdx(null);
    setDragIdx(null);

    // 서버에 새 순서 저장
    const orderedIds = updated.map((c) => c.id);
    startTransition(async () => {
      try {
        await reorderCategories(orderedIds);
      } catch {
        // 실패 시 원래 순서 복원
        setChildren(parent.children);
      }
    });
  }

  return (
    <div>
      {children.map((child, idx) => (
        <CategoryNode
          key={child.id}
          category={child}
          level={1}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
          draggable
          isDragOver={overIdx === idx && dragIdx !== idx}
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, idx)}
        />
      ))}
    </div>
  );
}

export function CategoryTree({
  initialTree,
}: {
  initialTree: CategoryTreeNode[];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryTreeNode | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [parentLabel, setParentLabel] = useState<string | undefined>();

  // 삭제 확인
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const heavyTree = initialTree.filter((c) => c.category_group === "heavy");
  const freightTree = initialTree.filter((c) => c.category_group === "freight");

  function handleAddRoot() {
    setEditTarget(null);
    setParentId(null);
    setParentLabel(undefined);
    setDialogOpen(true);
  }

  function handleAddChild(pId: string, pLabel: string) {
    setEditTarget(null);
    setParentId(pId);
    setParentLabel(pLabel);
    setDialogOpen(true);
  }

  function handleEdit(cat: CategoryTreeNode) {
    setEditTarget(cat);
    setParentId(cat.parent_id);
    setParentLabel(undefined);
    setDialogOpen(true);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteCategory(deleteTarget.id);
      } catch {
        toast.error("삭제에 실패했습니다.");
      }
      setDeleteTarget(null);
    });
  }

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">카테고리 트리</CardTitle>
          <Button
            size="sm"
            className="cursor-pointer gap-1"
            onClick={handleAddRoot}
          >
            <Plus className="size-4" />
            카테고리 추가
          </Button>
        </CardHeader>
        <CardContent>
          {/* 중장비 */}
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
            중장비
          </h3>
          <div className="divide-y">
            {heavyTree.map((category) => (
              <CategoryNode
                key={category.id}
                category={category}
                onAddChild={handleAddChild}
                onEdit={handleEdit}
                onDelete={(id, label) => setDeleteTarget({ id, label })}
              />
            ))}
          </div>

          {/* 화물특장 */}
          <h3 className="mb-2 mt-6 text-sm font-semibold text-muted-foreground">
            화물특장
          </h3>
          <div className="divide-y">
            {freightTree.map((category) => (
              <CategoryNode
                key={category.id}
                category={category}
                onAddChild={handleAddChild}
                onEdit={handleEdit}
                onDelete={(id, label) => setDeleteTarget({ id, label })}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        parentId={parentId}
        parentLabel={parentLabel}
        editTarget={editTarget}
      />

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteTarget?.label}&quot; 카테고리를 삭제하시겠습니까?
              <br />
              하위 카테고리도 함께 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "삭제"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
