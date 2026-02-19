"use client";

import { cn } from "@/lib/utils";
import {
  IconChevronDown,
  IconFlame,
  IconMenu2,
  IconMoon,
  IconSearch,
  IconStar,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useSyncExternalStore, useState } from "react";

import { Input } from "@/components/ui/input";

type NavChild = {
  name: string;
  link: string;
};

type NavChildGroup = {
  groupName: string;
  items: NavChild[];
};

type NavItem = {
  name: string;
  link: string;
  children?: NavChild[];
  groups?: NavChildGroup[];
};

const navItems: NavItem[] = [
  { name: "매물등록", link: "/listings/register" },
  {
    name: "업체찾기/등록",
    link: "#",
    children: [
      { name: "업체찾기", link: "/companies" },
      { name: "업체등록", link: "/companies/register" },
    ],
  },
  {
    name: "구인/구직",
    link: "#",
    children: [
      { name: "구인", link: "/recruit" },
      { name: "구직", link: "/jobs" },
    ],
  },
  {
    name: "게시판",
    link: "/board",
    groups: [
      {
        groupName: "매매",
        items: [
          { name: "매물 삽니다", link: "/board/buy" },
          { name: "매물 팝니다", link: "/board/sell" },
          { name: "번호판 삽니다", link: "/board/plate-buy" },
          { name: "번호판 팝니다", link: "/board/plate-sell" },
        ],
      },
      {
        groupName: "자격증/시험/취업",
        items: [
          { name: "중장비자격증 정보공유", link: "/board/license-info" },
          { name: "자격증 취득 후기", link: "/board/license-review" },
          { name: "취업정보공유", link: "/board/job-info" },
        ],
      },
      {
        groupName: "기타",
        items: [
          { name: "자유게시판", link: "/board/free" },
          { name: "업무후기", link: "/board/work-review" },
          { name: "일상공유", link: "/board/daily" },
        ],
      },
    ],
  },
  { name: "주요양식", link: "/forms" },
  { name: "회사소개", link: "/about" },
];

export function Header() {
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={headerRef} className="sticky top-0 z-50 w-full">
      {/* Utility bar */}
      <div className="border-b border-neutral-200 bg-neutral-900 dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <Link
              href="/favorites"
              className="flex cursor-pointer items-center gap-1 transition hover:text-white"
            >
              <IconStar className="h-3.5 w-3.5" />
              <span>즐겨찾기</span>
            </Link>
            <span>|</span>
            <span>
              오늘 <span className="font-medium text-white">128</span>
            </span>
            <span>|</span>
            <span>
              전체 <span className="font-medium text-white">15,482</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <ThemeToggle />
            <span>|</span>
            <Link
              href="/faq"
              className="cursor-pointer transition hover:text-white"
            >
              자주 묻는 질문
            </Link>
            <span>|</span>
            <Link
              href="/contact"
              className="cursor-pointer transition hover:text-white"
            >
              문의하기
            </Link>
            <span>|</span>
            <Link
              href="/advertising"
              className="cursor-pointer transition hover:text-white"
            >
              광고문의
            </Link>
          </div>
        </div>
      </div>
      {/* Top bar - 로고 */}
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex cursor-pointer items-center text-4xl tracking-tight"
            style={{ fontFamily: "'EutmanEungtteong', sans-serif" }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-3xl font-bold text-white">J</span>
            <span className="ml-1.5 text-orange-500">중기</span>
            <span className="text-orange-600">나라</span>
          </Link>
          {/* 검색창 + 인기 매물 */}
          <div className="hidden flex-1 items-center gap-4 px-8 sm:flex">
            <SearchBar />
            <TrendingTicker />
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="cursor-pointer rounded-lg bg-orange-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
      {/* Nav bar */}
      <header className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <DesktopNav />
        <MobileNav />
      </header>
    </div>
  );
}

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// ─── Desktop ────────────────────────────────────────
const DesktopNav = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.div
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-start px-4 py-2 lg:flex",
      )}
    >
      <nav
        onMouseLeave={() => setActive(null)}
        className="flex items-center gap-2"
      >
        {navItems.map((item) =>
          item.children || item.groups ? (
            <DesktopDropdownItem
              key={item.name}
              item={item}
              active={active}
              setActive={setActive}
            />
          ) : (
            <Link
              key={item.name}
              href={item.link}
              className="cursor-pointer rounded-lg px-4 py-2.5 text-base font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ),
        )}
      </nav>
    </motion.div>
  );
};

const DesktopDropdownItem = ({
  item,
  active,
  setActive,
}: {
  item: NavItem;
  active: string | null;
  setActive: (v: string | null) => void;
}) => {
  return (
    <div onMouseEnter={() => setActive(item.name)} className="relative">
      <motion.span
        transition={{ duration: 0.3 }}
        className="flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2.5 text-base font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        {item.name}
        <IconChevronDown className="h-4 w-4" />
      </motion.span>

      {active === item.name && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
            layoutId="active-dropdown"
            className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-neutral-950"
          >
                {item.groups ? (
                  <motion.div layout className="flex w-max gap-0 p-4">
                    {item.groups.map((group, idx) => (
                      <div
                        key={group.groupName}
                        className={cn(
                          "flex flex-col gap-1 px-4",
                          idx !== item.groups!.length - 1 &&
                            "border-r border-neutral-200 dark:border-neutral-800",
                        )}
                      >
                        <span className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          {group.groupName}
                        </span>
                        {group.items.map((child) => (
                          <Link
                            key={child.name}
                            href={child.link}
                            className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div layout className="flex w-max flex-col gap-1 p-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.name}
                        href={child.link}
                        className="cursor-pointer rounded-lg px-4 py-2.5 text-base text-neutral-700 transition hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ─── Mobile ─────────────────────────────────────────
const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="relative mx-auto flex w-full flex-col lg:hidden">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          메뉴
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-black dark:text-white"
        >
          {open ? <IconX /> : <IconMenu2 />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
              {navItems.map((item) =>
                item.children || item.groups ? (
                  <MobileDropdownItem
                    key={item.name}
                    item={item}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-base text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── 검색바 ─────────────────────────────────────────
const SearchBar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="장비명, 모델명, 지역 등을 검색하세요"
        className="h-10 rounded-lg border-neutral-300 pl-9 pr-4 dark:border-neutral-700"
      />
    </form>
  );
};

// ─── 오늘의 인기 매물 티커 ──────────────────────────
const trendingItems = [
  { rank: 1, name: "CAT 320D 굴삭기", link: "/listings/1" },
  { rank: 2, name: "두산 DX225 굴삭기", link: "/listings/2" },
  { rank: 3, name: "현대 R210W-9S 휠굴삭기", link: "/listings/3" },
  { rank: 4, name: "볼보 EC210B 굴삭기", link: "/listings/4" },
  { rank: 5, name: "코마츠 PC200-8 굴삭기", link: "/listings/5" },
];

const TrendingTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % trendingItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const item = trendingItems[index];

  return (
    <div className="hidden items-center gap-2 text-sm lg:flex">
      <span className="flex items-center gap-1 font-semibold text-red-500">
        <IconFlame className="h-4 w-4" />
        인기
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={item.rank}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={item.link}
            className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-xs font-bold text-white dark:bg-neutral-100 dark:text-black">
              {item.rank}
            </span>
            {item.name}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── 다크모드 토글 ──────────────────────────────────
const emptySubscribe = () => () => {};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <span className="h-4 w-4" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer rounded p-0.5 transition hover:text-white"
      aria-label="다크모드 전환"
    >
      {theme === "dark" ? (
        <IconSun className="h-4 w-4" />
      ) : (
        <IconMoon className="h-4 w-4" />
      )}
    </button>
  );
};

const MobileDropdownItem = ({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <span>{item.name}</span>
        <IconChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.groups ? (
              <div className="flex flex-col gap-3 pl-4 pb-2">
                {item.groups.map((group) => (
                  <div key={group.groupName} className="flex flex-col gap-1">
                    <span className="px-3 pt-1 text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
                      {group.groupName}
                    </span>
                    {group.items.map((child) => (
                      <Link
                        key={child.name}
                        href={child.link}
                        onClick={onNavigate}
                        className="cursor-pointer rounded-lg px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 sm:text-base"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1 pl-4">
                {item.children!.map((child) => (
                  <Link
                    key={child.name}
                    href={child.link}
                    onClick={onNavigate}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 sm:text-base"
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
