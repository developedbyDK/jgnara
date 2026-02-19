"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, {
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconBackhoe,
  IconTruck,
  IconPropeller,
  IconForklift,
  IconDropletFilled,
  IconPackage,
  IconCrane,
  IconBulldozer,
  IconRoad,
  IconBuildingFactory2,
  IconHammer,
  IconTool,
  IconArrowNarrowLeft,
  IconMenu2,
  IconX,
  IconChevronRight,
  IconChevronDown,
  IconTruckDelivery,
  IconSnowflake,
  IconTir,
  IconCarCrane,
  IconLadder,
  IconBarrel,
  IconBus,
  IconCamper,
} from "@tabler/icons-react";
import {
  MobileBannerCarousel,
  MobileBannerGrid,
} from "@/components/layout/mobile-banner";
import { useCategories } from "@/lib/use-categories";
import type { CategoryTreeNode } from "@/lib/category-queries";

// ─── Types ───────────────────────────────────────────
interface CategoryLink {
  label: string;
  href: string;
  slug: string;
  icon: React.ReactNode;
  subcategories: { label: string; href: string }[];
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ─── Data ────────────────────────────────────────────
const iconClass = "h-5 w-5 flex-shrink-0 text-white/70";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  excavator: <IconBackhoe className={iconClass} />,
  "dump-truck": <IconTruck className={iconClass} />,
  "mixer-truck": <IconPropeller className={iconClass} />,
  forklift: <IconForklift className={iconClass} />,
  "water-truck": <IconDropletFilled className={iconClass} />,
  "cargo-truck": <IconPackage className={iconClass} />,
  crane: <IconCrane className={iconClass} />,
  loader: <IconBulldozer className={iconClass} />,
  finisher: <IconRoad className={iconClass} />,
  crusher: <IconBuildingFactory2 className={iconClass} />,
  compressor: <IconHammer className={iconClass} />,
  etc: <IconTool className={iconClass} />,
  "cargo-transport": <IconTruckDelivery className={iconClass} />,
  "freight-dump": <IconTruck className={iconClass} />,
  "refrigerated-wing": <IconSnowflake className={iconClass} />,
  "freight-trailer": <IconTir className={iconClass} />,
  wrecker: <IconCarCrane className={iconClass} />,
  "ladder-truck": <IconLadder className={iconClass} />,
  tanker: <IconBarrel className={iconClass} />,
  bus: <IconBus className={iconClass} />,
  "special-vehicle": <IconCamper className={iconClass} />,
};

function mapTreeToLinks(nodes: CategoryTreeNode[]): CategoryLink[] {
  return nodes.map((node) => ({
    label: node.label,
    href: `/category/${node.slug}`,
    slug: node.slug,
    icon: CATEGORY_ICONS[node.icon_key ?? node.slug] ?? (
      <IconTool className={iconClass} />
    ),
    subcategories: node.children.map((child) => ({
      label: child.label,
      href: `/category/${node.slug}/${child.slug}`,
    })),
  }));
}

// ─── Context ─────────────────────────────────────────
const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// ─── Desktop Sidebar Link ────────────────────────────
const SidebarLink = ({
  link,
  className,
  onHover,
  isHovered,
}: {
  link: CategoryLink;
  className?: string;
  onHover: (href: string | null, element: HTMLElement | null) => void;
  isHovered: boolean;
}) => {
  const { open } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(link.href, ref.current)}
      onMouseLeave={() => onHover(null, null)}
    >
      <Link
        href={link.href}
        className={cn(
          "flex cursor-pointer items-center gap-2.5 px-2.5 py-2 transition-colors hover:bg-white/10",
          isHovered && "bg-white/10",
          className,
        )}
      >
        {link.icon}
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
            opacity: open ? 1 : 0,
          }}
          className="m-0! inline-block p-0! text-base whitespace-pre text-white transition duration-150"
        >
          {link.label}
        </motion.span>
        {open && link.subcategories.length > 0 && (
          <IconChevronRight
            className={cn(
              "ml-auto h-4 w-4 shrink-0 text-white/40 transition-colors",
              isHovered && "text-white/80",
            )}
          />
        )}
      </Link>
    </div>
  );
};

// ─── Desktop Sidebar ─────────────────────────────────
const DesktopSidebar = ({
  heavyCategories,
  freightCategories,
}: {
  heavyCategories: CategoryLink[];
  freightCategories: CategoryLink[];
}) => {
  const { open, setOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allCategories = [...heavyCategories, ...freightCategories];
  const hoveredData = allCategories.find((c) => c.href === hoveredCategory);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  }, [clearCloseTimer]);

  const handleHover = useCallback(
    (href: string | null, element: HTMLElement | null) => {
      clearCloseTimer();
      if (href) {
        setHoveredCategory(href);
        if (element && sidebarRef.current) {
          const sidebarRect = sidebarRef.current.getBoundingClientRect();
          const itemRect = element.getBoundingClientRect();
          setFlyoutTop(itemRect.top - sidebarRect.top);
        }
      } else {
        scheduleClose();
      }
    },
    [clearCloseTimer, scheduleClose],
  );

  return (
    <motion.aside
      ref={sidebarRef}
      className={cn(
        "group/sidebar-btn relative my-2 hidden shrink-0 flex-col border border-white/10 bg-orange-700 px-3 py-4 shadow-lg md:flex",
      )}
      animate={{ width: open ? "240px" : "60px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "absolute -right-3 top-6 z-40 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black shadow-sm transition duration-200 group-hover/sidebar-btn:flex",
          open ? "rotate-0" : "rotate-180",
        )}
      >
        <IconArrowNarrowLeft className="h-3.5 w-3.5 text-white" />
      </button>

      {/* Header */}
      <div className="mb-4 px-2.5">
        {open ? (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-bold text-white whitespace-pre"
          >
            중장비 카테고리
          </motion.h2>
        ) : (
          <div className="flex justify-center">
            <IconTruck className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      <div className="h-px w-full bg-white/15" />

      {/* Category links */}
      <nav className="mt-3 flex flex-1 flex-col gap-0.5 overflow-x-hidden overflow-y-auto">
        {heavyCategories.map((cat) => (
          <SidebarLink
            key={cat.href}
            link={cat}
            onHover={handleHover}
            isHovered={hoveredCategory === cat.href}
          />
        ))}

        {/* 화물특장 섹션 */}
        <div className="mt-3 mb-1 h-px w-full bg-white/15" />
        <div className="px-2.5 py-1.5">
          {open ? (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-base font-bold text-white whitespace-pre"
            >
              화물특장 카테고리
            </motion.h2>
          ) : (
            <div className="flex justify-center">
              <IconTruckDelivery className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {freightCategories.map((cat) => (
          <SidebarLink
            key={cat.href}
            link={cat}
            onHover={handleHover}
            isHovered={hoveredCategory === cat.href}
          />
        ))}
      </nav>

      {/* Flyout - rendered outside nav to avoid overflow clipping */}
      {hoveredData && hoveredData.subcategories.length > 0 && (
        <div
          className="absolute left-full z-50 pl-1"
          style={{ top: flyoutTop }}
          onMouseEnter={() => {
            clearCloseTimer();
            setHoveredCategory(hoveredData.href);
          }}
          onMouseLeave={scheduleClose}
        >
          <div className="w-48 border border-white/10 bg-neutral-900 py-2 shadow-lg">
            {hoveredData.subcategories.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block cursor-pointer px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.aside>
  );
};

// ─── Mobile Sidebar ──────────────────────────────────
const MobileSidebar = ({
  heavyCategories,
  freightCategories,
}: {
  heavyCategories: CategoryLink[];
  freightCategories: CategoryLink[];
}) => {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (href: string) => {
    setExpandedCategory((prev) => (prev === href ? null : href));
  };

  return (
    <div className="md:hidden">
      {/* Mobile toggle bar */}
      <div className="mx-2 mt-2 flex items-center gap-2 border border-white/10 bg-black px-4 py-2.5 shadow-lg">
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer p-1.5 text-white transition hover:bg-white/10"
        >
          <IconMenu2 className="h-5 w-5" />
        </button>
        <span className="text-base font-medium text-white">
          중장비 카테고리
        </span>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-pointer bg-black/70"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-4 left-4 z-50 w-72 border border-white/10 bg-black px-4 py-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-white">
                  중장비 카테고리
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="cursor-pointer p-1 text-white transition hover:bg-white/10"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              <div className="h-px w-full bg-white/15" />

              <nav className="mt-3 flex flex-col gap-0.5 overflow-y-auto">
                {heavyCategories.map((cat) => (
                  <div key={cat.href}>
                    <div className="flex items-center">
                      <Link
                        href={cat.href}
                        onClick={() => setOpen(false)}
                        className="flex flex-1 cursor-pointer items-center gap-2.5 px-2.5 py-2.5 text-base text-white transition hover:bg-white/10"
                      >
                        {cat.icon}
                        {cat.label}
                      </Link>
                      {cat.subcategories.length > 0 && (
                        <button
                          onClick={() => toggleCategory(cat.href)}
                          className="cursor-pointer p-2 text-white/40 transition hover:text-white/80"
                        >
                          <IconChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedCategory === cat.href && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {expandedCategory === cat.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block cursor-pointer py-2 pl-12 pr-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* 화물특장 섹션 */}
                <div className="mt-3 mb-1 h-px w-full bg-white/15" />
                <h2 className="px-2.5 py-1.5 text-base font-bold text-white">
                  화물특장 카테고리
                </h2>

                {freightCategories.map((cat) => (
                  <div key={cat.href}>
                    <Link
                      href={cat.href}
                      onClick={() => setOpen(false)}
                      className="flex flex-1 cursor-pointer items-center gap-2.5 px-2.5 py-2.5 text-base text-white transition hover:bg-white/10"
                    >
                      {cat.icon}
                      {cat.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Exported Component ──────────────────────────────
export function CategorySidebar({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const { heavyTree, freightTree } = useCategories();

  const heavyCategories = mapTreeToLinks(heavyTree);
  const freightCategories = mapTreeToLinks(freightTree);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="mx-auto flex h-[calc(100dvh-var(--header-h))] w-full max-w-7xl">
        <DesktopSidebar
          heavyCategories={heavyCategories}
          freightCategories={freightCategories}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <MobileSidebar
            heavyCategories={heavyCategories}
            freightCategories={freightCategories}
          />
          {/* Mobile top banner carousel */}
          {aside && <MobileBannerCarousel />}
          <div className="flex flex-1 gap-2 overflow-hidden py-2">
            {/* Main content */}
            <div className="flex-1 overflow-y-auto border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
              {children}
              {/* Mobile bottom banner grid */}
              {aside && <MobileBannerGrid />}
            </div>
            {/* Right aside (desktop only) */}
            {aside && (
              <aside className="hidden w-50 shrink-0 flex-col gap-2 overflow-y-auto lg:flex">
                {aside}
              </aside>
            )}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
