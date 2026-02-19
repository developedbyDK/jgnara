"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type AdminContactView,
  type ContactStatus,
  getInquiryTypeLabel,
} from "@/lib/contact-types";
import { updateContactStatus, deleteContact } from "@/lib/contact-actions";

const ITEMS_PER_PAGE = 10;

function getContactStatusColor(status: ContactStatus) {
  switch (status) {
    case "대기":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "답변완료":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "보류":
      return "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400";
    default:
      return "";
  }
}

interface ContactTableProps {
  contacts: AdminContactView[];
}

export function ContactTable({ contacts }: ContactTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] =
    useState<AdminContactView | null>(null);

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        !search ||
        c.name.includes(search) ||
        c.email.includes(search) ||
        c.subject.includes(search);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchType = typeFilter === "all" || c.inquiryType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [contacts, search, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleStatusChange = (id: string, status: string) => {
    startTransition(async () => {
      const result = await updateContactStatus(id, status);
      if (result.success) router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteContact(id);
      if (result.success) {
        setSelectedContact(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="이름, 이메일, 제목 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-28 cursor-pointer">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              전체 상태
            </SelectItem>
            <SelectItem value="대기" className="cursor-pointer">
              대기
            </SelectItem>
            <SelectItem value="답변완료" className="cursor-pointer">
              답변완료
            </SelectItem>
            <SelectItem value="보류" className="cursor-pointer">
              보류
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-32 cursor-pointer">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              전체 유형
            </SelectItem>
            <SelectItem value="general" className="cursor-pointer">
              일반 문의
            </SelectItem>
            <SelectItem value="listing" className="cursor-pointer">
              매물 관련
            </SelectItem>
            <SelectItem value="company" className="cursor-pointer">
              업체등록 관련
            </SelectItem>
            <SelectItem value="recruit" className="cursor-pointer">
              구인/구직
            </SelectItem>
            <SelectItem value="payment" className="cursor-pointer">
              결제/환불
            </SelectItem>
            <SelectItem value="report" className="cursor-pointer">
              신고/제보
            </SelectItem>
            <SelectItem value="partnership" className="cursor-pointer">
              제휴/협력
            </SelectItem>
            <SelectItem value="other" className="cursor-pointer">
              기타
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">이메일</TableHead>
              <TableHead className="hidden lg:table-cell">유형</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden lg:table-cell">접수일</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((contact) => (
              <TableRow
                key={contact.id}
                className={isPending ? "opacity-50" : ""}
              >
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {contact.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline" className="text-[11px]">
                    {getInquiryTypeLabel(contact.inquiryType)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-sm">
                  {contact.subject}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`text-[11px] ${getContactStatusColor(contact.status)}`}
                  >
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                  {contact.createdAt}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 cursor-pointer"
                        disabled={isPending}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setSelectedContact(contact)}
                      >
                        <Eye className="mr-2 size-4" />
                        상세보기
                      </DropdownMenuItem>
                      {contact.status !== "답변완료" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            handleStatusChange(contact.id, "답변완료")
                          }
                        >
                          <CheckCircle className="mr-2 size-4" />
                          답변완료 처리
                        </DropdownMenuItem>
                      )}
                      {contact.status !== "보류" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            handleStatusChange(contact.id, "보류")
                          }
                        >
                          <Clock className="mr-2 size-4" />
                          보류 처리
                        </DropdownMenuItem>
                      )}
                      {contact.status !== "대기" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            handleStatusChange(contact.id, "대기")
                          }
                        >
                          <Clock className="mr-2 size-4" />
                          대기로 변경
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paged.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  문의 내역이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">총 {filtered.length}건</p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              이전
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                className="w-8 cursor-pointer"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>문의 상세</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">이름</p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">이메일</p>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">연락처</p>
                  <p className="font-medium">
                    {selectedContact.phone || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">문의유형</p>
                  <p className="font-medium">
                    {getInquiryTypeLabel(selectedContact.inquiryType)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">접수일</p>
                  <p className="font-medium">{selectedContact.createdAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">상태</p>
                  <Badge
                    variant="secondary"
                    className={`text-[11px] ${getContactStatusColor(selectedContact.status)}`}
                  >
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">제목</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>
              <div className="text-sm">
                <p className="mb-1 text-muted-foreground">내용</p>
                <div className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-md border bg-muted/50 p-3 text-sm">
                  {selectedContact.message}
                </div>
              </div>
              {selectedContact.adminNote && (
                <div className="text-sm">
                  <p className="mb-1 text-muted-foreground">관리자 메모</p>
                  <div className="rounded-md border bg-muted/50 p-3 text-sm">
                    {selectedContact.adminNote}
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                {selectedContact.status !== "답변완료" && (
                  <Button
                    size="sm"
                    className="cursor-pointer"
                    disabled={isPending}
                    onClick={() =>
                      handleStatusChange(selectedContact.id, "답변완료")
                    }
                  >
                    <CheckCircle className="mr-1.5 size-3.5" />
                    답변완료
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  disabled={isPending}
                  onClick={() => handleDelete(selectedContact.id)}
                >
                  <Trash2 className="mr-1.5 size-3.5" />
                  삭제
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
