export type BoardConfig = {
  slug: string;
  title: string;
  description: string;
  group: string;
  categories: string[];
  categoryColors: Record<string, string>;
};

// ─── Category Color Presets ─────────────────────────
const TRADE_COLORS: Record<string, string> = {
  굴삭기: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  지게차: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  크레인: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  로더: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  덤프: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  불도저: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  기타: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

const CERT_COLORS: Record<string, string> = {
  굴착기: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  지게차: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  크레인: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  로더: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  불도저: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  기타: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

const JOB_COLORS: Record<string, string> = {
  구인: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  구직: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  현장정보: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  면접후기: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  기타: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

const FREE_COLORS: Record<string, string> = {
  잡담: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  질문: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  정보공유: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  후기: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  기타: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

const WORK_REVIEW_COLORS: Record<string, string> = {
  현장후기: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  장비후기: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  업체후기: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  기타: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

const DAILY_COLORS: Record<string, string> = {
  일상: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  취미: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  맛집: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  여행: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  기타: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

// ─── Board Configs ──────────────────────────────────
export const BOARD_CONFIGS: Record<string, BoardConfig> = {
  // ── 매매 ──
  buy: {
    slug: "buy",
    title: "매물 삽니다",
    description: "중장비 매물을 구매하고 싶은 분들의 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
  },
  sell: {
    slug: "sell",
    title: "매물 팝니다",
    description: "중장비 매물을 판매하고 싶은 분들의 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
  },
  "plate-buy": {
    slug: "plate-buy",
    title: "번호판 삽니다",
    description: "건설기계 번호판 구매 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
  },
  "plate-sell": {
    slug: "plate-sell",
    title: "번호판 팝니다",
    description: "건설기계 번호판 판매 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
  },

  // ── 자격증/시험/취업 ──
  "license-info": {
    slug: "license-info",
    title: "중장비자격증 정보공유",
    description: "중장비 자격증 관련 정보를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "굴착기", "지게차", "크레인", "로더", "불도저", "기타"],
    categoryColors: CERT_COLORS,
  },
  "license-review": {
    slug: "license-review",
    title: "자격증 취득 후기",
    description: "자격증 취득 경험과 후기를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "굴착기", "지게차", "크레인", "로더", "불도저", "기타"],
    categoryColors: CERT_COLORS,
  },
  "job-info": {
    slug: "job-info",
    title: "취업정보공유",
    description: "건설장비 업계 취업 정보를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "구인", "구직", "현장정보", "면접후기", "기타"],
    categoryColors: JOB_COLORS,
  },

  // ── 기타 ──
  free: {
    slug: "free",
    title: "자유게시판",
    description: "건설장비 관련 자유로운 이야기를 나누세요",
    group: "기타",
    categories: ["전체", "잡담", "질문", "정보공유", "후기", "기타"],
    categoryColors: FREE_COLORS,
  },
  "work-review": {
    slug: "work-review",
    title: "업무후기",
    description: "현장, 장비, 업체 관련 업무 후기를 공유하는 게시판입니다",
    group: "기타",
    categories: ["전체", "현장후기", "장비후기", "업체후기", "기타"],
    categoryColors: WORK_REVIEW_COLORS,
  },
  daily: {
    slug: "daily",
    title: "일상공유",
    description: "일상, 취미, 맛집 등 자유롭게 이야기를 나누세요",
    group: "기타",
    categories: ["전체", "일상", "취미", "맛집", "여행", "기타"],
    categoryColors: DAILY_COLORS,
  },
};

export function getBoardConfig(slug: string): BoardConfig | undefined {
  return BOARD_CONFIGS[slug];
}

export function getAllBoardSlugs(): string[] {
  return Object.keys(BOARD_CONFIGS);
}
