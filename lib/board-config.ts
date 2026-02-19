export type BoardConfig = {
  slug: string;
  title: string;
  description: string;
  group: string;
  categories: string[];
  categoryColors: Record<string, string>;
  mockPosts: BoardPost[];
};

export type BoardPost = {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  views: number;
  comments: number;
  isPinned?: boolean;
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
    mockPosts: [
      { id: 1, title: "[공지] 매물 삽니다 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 823, comments: 2, isPinned: true },
      { id: 10, title: "두산 DX225 2018년식 이후 모델 구합니다", author: "건설왕", category: "굴삭기", date: "2025-01-15", views: 234, comments: 5 },
      { id: 9, title: "3톤 지게차 급구합니다 (경기 남부)", author: "물류담당", category: "지게차", date: "2025-01-14", views: 189, comments: 3 },
      { id: 8, title: "25톤 카고크레인 구매 원합니다", author: "크레인맨", category: "크레인", date: "2025-01-14", views: 312, comments: 7 },
      { id: 7, title: "소형 로더 봅캣 S130급 찾습니다", author: "소형장비", category: "로더", date: "2025-01-13", views: 145, comments: 2 },
      { id: 6, title: "15톤 덤프 2020년 이후 모델 구합니다", author: "운송업체", category: "덤프", date: "2025-01-13", views: 267, comments: 4 },
      { id: 5, title: "CAT 320D 시간 1만 이하 급구", author: "중기사랑", category: "굴삭기", date: "2025-01-12", views: 445, comments: 12 },
      { id: 4, title: "현대 지게차 5톤 급구합니다", author: "창고관리", category: "지게차", date: "2025-01-12", views: 178, comments: 1 },
      { id: 3, title: "볼보 EC210B 구매 희망", author: "볼보매니아", category: "굴삭기", date: "2025-01-11", views: 298, comments: 6 },
    ],
  },
  sell: {
    slug: "sell",
    title: "매물 팝니다",
    description: "중장비 매물을 판매하고 싶은 분들의 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 매물 팝니다 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 1102, comments: 3, isPinned: true },
      { id: 12, title: "두산 DX225 2019년식 8천시간 판매합니다", author: "장비매매", category: "굴삭기", date: "2025-01-15", views: 567, comments: 15 },
      { id: 11, title: "현대 HDF50-7S 지게차 팝니다 (3천시간)", author: "포크왕", category: "지게차", date: "2025-01-15", views: 234, comments: 4 },
      { id: 10, title: "볼보 EC210B 2017년식 급매", author: "급매중", category: "굴삭기", date: "2025-01-14", views: 678, comments: 21 },
      { id: 9, title: "히타치 ZX200 1만2천시간 판매", author: "중기딜러", category: "굴삭기", date: "2025-01-14", views: 345, comments: 8 },
      { id: 8, title: "50톤 올테레인 크레인 매각합니다", author: "크레인업체", category: "크레인", date: "2025-01-13", views: 423, comments: 6 },
      { id: 7, title: "봅캣 S185 2020년식 저시간 판매", author: "봅캣전문", category: "로더", date: "2025-01-13", views: 198, comments: 3 },
      { id: 6, title: "15톤 덤프 2021년식 판매합니다", author: "덤프매매", category: "덤프", date: "2025-01-12", views: 289, comments: 5 },
      { id: 5, title: "코마츠 PC200-8 6천시간 상태 좋아요", author: "코마츠팬", category: "굴삭기", date: "2025-01-12", views: 512, comments: 18 },
    ],
  },
  "plate-buy": {
    slug: "plate-buy",
    title: "번호판 삽니다",
    description: "건설기계 번호판 구매 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 번호판 삽니다 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 534, comments: 1, isPinned: true },
      { id: 8, title: "굴삭기 번호판 급구합니다 (서울/경기)", author: "번호판급구", category: "굴삭기", date: "2025-01-15", views: 345, comments: 8 },
      { id: 7, title: "3톤 지게차 번호판 구합니다", author: "지게차운전", category: "지게차", date: "2025-01-14", views: 198, comments: 4 },
      { id: 6, title: "크레인 번호판 매입 원합니다", author: "크레인업", category: "크레인", date: "2025-01-13", views: 267, comments: 3 },
      { id: 5, title: "06 굴삭기 번호판 구매합니다", author: "장비사장", category: "굴삭기", date: "2025-01-12", views: 423, comments: 11 },
      { id: 4, title: "로더 번호판 구합니다 (충남 지역)", author: "충남업체", category: "로더", date: "2025-01-11", views: 156, comments: 2 },
    ],
  },
  "plate-sell": {
    slug: "plate-sell",
    title: "번호판 팝니다",
    description: "건설기계 번호판 판매 게시판입니다",
    group: "매매",
    categories: ["전체", "굴삭기", "지게차", "크레인", "로더", "덤프", "기타"],
    categoryColors: TRADE_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 번호판 팝니다 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 478, comments: 1, isPinned: true },
      { id: 7, title: "굴삭기 번호판 양도합니다", author: "번호판매매", category: "굴삭기", date: "2025-01-15", views: 456, comments: 14 },
      { id: 6, title: "지게차 번호판 팝니다 (즉시 이전 가능)", author: "포크리프트", category: "지게차", date: "2025-01-14", views: 234, comments: 5 },
      { id: 5, title: "25톤 크레인 번호판 매도합니다", author: "크레인전문", category: "크레인", date: "2025-01-13", views: 312, comments: 7 },
      { id: 4, title: "덤프 번호판 2개 판매", author: "운수업체", category: "덤프", date: "2025-01-12", views: 189, comments: 3 },
      { id: 3, title: "06 굴삭기 번호판 급매합니다", author: "급매도", category: "굴삭기", date: "2025-01-11", views: 567, comments: 19 },
    ],
  },

  // ── 자격증/시험/취업 ──
  "license-info": {
    slug: "license-info",
    title: "중장비자격증 정보공유",
    description: "중장비 자격증 관련 정보를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "굴착기", "지게차", "크레인", "로더", "불도저", "기타"],
    categoryColors: CERT_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 2025년 건설기계 자격증 시험 일정 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 2341, comments: 15, isPinned: true },
      { id: 10, title: "굴착기 운전기능사 시험 준비 팁 정리", author: "합격자", category: "굴착기", date: "2025-01-15", views: 678, comments: 23 },
      { id: 9, title: "지게차 면허 학원 비용 비교 (수도권)", author: "면허준비", category: "지게차", date: "2025-01-14", views: 456, comments: 12 },
      { id: 8, title: "크레인 자격증 종류별 난이도 정리", author: "크레인전문", category: "크레인", date: "2025-01-14", views: 534, comments: 8 },
      { id: 7, title: "2025년 기능사 실기 시험 변경사항", author: "시험정보", category: "기타", date: "2025-01-13", views: 789, comments: 17 },
      { id: 6, title: "로더 면허 취득 과정 상세 안내", author: "로더기사", category: "로더", date: "2025-01-12", views: 312, comments: 5 },
      { id: 5, title: "불도저 운전기능사 실기 코스 공략", author: "불도저맨", category: "불도저", date: "2025-01-11", views: 234, comments: 9 },
    ],
  },
  "license-review": {
    slug: "license-review",
    title: "자격증 취득 후기",
    description: "자격증 취득 경험과 후기를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "굴착기", "지게차", "크레인", "로더", "불도저", "기타"],
    categoryColors: CERT_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 자격증 후기 작성 가이드", author: "관리자", category: "기타", date: "2025-01-15", views: 567, comments: 2, isPinned: true },
      { id: 8, title: "굴착기 기능사 한번에 합격 후기!", author: "일발합격", category: "굴착기", date: "2025-01-15", views: 456, comments: 18 },
      { id: 7, title: "지게차 면허 3일만에 취득한 후기", author: "속성취득", category: "지게차", date: "2025-01-14", views: 678, comments: 25 },
      { id: 6, title: "크레인 기능사 실기 3번만에 합격", author: "끈기왕", category: "크레인", date: "2025-01-13", views: 345, comments: 14 },
      { id: 5, title: "40대에 굴착기 자격증 도전 성공기", author: "늦깎이", category: "굴착기", date: "2025-01-12", views: 534, comments: 32 },
      { id: 4, title: "로더 기능사 필기+실기 동시 준비 후기", author: "동시합격", category: "로더", date: "2025-01-11", views: 234, comments: 7 },
    ],
  },
  "job-info": {
    slug: "job-info",
    title: "취업정보공유",
    description: "건설장비 업계 취업 정보를 공유하는 게시판입니다",
    group: "자격증/시험/취업",
    categories: ["전체", "구인", "구직", "현장정보", "면접후기", "기타"],
    categoryColors: JOB_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 취업정보 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 445, comments: 1, isPinned: true },
      { id: 8, title: "대형 건설사 중장비 기사 채용 정보", author: "취업도우미", category: "구인", date: "2025-01-15", views: 567, comments: 12 },
      { id: 7, title: "경기도 현장 굴삭기 기사 구합니다", author: "현장소장", category: "구인", date: "2025-01-14", views: 345, comments: 8 },
      { id: 6, title: "지게차 기사 면접 후기 공유합니다", author: "면접후기맨", category: "면접후기", date: "2025-01-13", views: 289, comments: 15 },
      { id: 5, title: "타워크레인 기사 연봉 정보 정리", author: "연봉분석", category: "현장정보", date: "2025-01-12", views: 678, comments: 21 },
      { id: 4, title: "건설현장 일감 구합니다 (크레인)", author: "크레인기사", category: "구직", date: "2025-01-11", views: 198, comments: 4 },
    ],
  },

  // ── 기타 ──
  free: {
    slug: "free",
    title: "자유게시판",
    description: "건설장비 관련 자유로운 이야기를 나누세요",
    group: "기타",
    categories: ["전체", "잡담", "질문", "정보공유", "후기", "기타"],
    categoryColors: FREE_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 자유게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 1542, comments: 3, isPinned: true },
      { id: 2, title: "[공지] 허위 매물 신고 안내 및 주의사항", author: "관리자", category: "정보공유", date: "2025-01-10", views: 987, comments: 5, isPinned: true },
      { id: 30, title: "굴착기 면허 취득 후기 공유합니다", author: "장비맨", category: "후기", date: "2025-01-15", views: 342, comments: 12 },
      { id: 29, title: "두산 DX225 vs 현대 R220 어떤게 나을까요?", author: "건설왕", category: "질문", date: "2025-01-15", views: 567, comments: 23 },
      { id: 28, title: "올해 중장비 시장 전망 어떻게 보시나요", author: "중기사랑", category: "잡담", date: "2025-01-14", views: 423, comments: 18 },
      { id: 27, title: "CAT 336 유압펌프 교체 비용 문의", author: "정비초보", category: "질문", date: "2025-01-14", views: 234, comments: 8 },
      { id: 26, title: "건설기계 보험료 비교 정보 공유", author: "보험전문", category: "정보공유", date: "2025-01-14", views: 678, comments: 15 },
      { id: 25, title: "경기도 현장 일감 요즘 어떤가요", author: "자유인", category: "잡담", date: "2025-01-13", views: 312, comments: 21 },
      { id: 24, title: "볼보 EC210B 3만시간 사용 후기", author: "볼보매니아", category: "후기", date: "2025-01-13", views: 456, comments: 9 },
      { id: 23, title: "중장비 운송비 평균 얼마나 하나요?", author: "물류맨", category: "질문", date: "2025-01-13", views: 289, comments: 14 },
      { id: 22, title: "겨울철 장비 관리 팁 공유합니다", author: "정비마스터", category: "정보공유", date: "2025-01-12", views: 534, comments: 7 },
      { id: 21, title: "20톤 굴착기 일일 대여료 시세 문의", author: "현장소장", category: "질문", date: "2025-01-12", views: 378, comments: 11 },
    ],
  },
  "work-review": {
    slug: "work-review",
    title: "업무후기",
    description: "현장, 장비, 업체 관련 업무 후기를 공유하는 게시판입니다",
    group: "기타",
    categories: ["전체", "현장후기", "장비후기", "업체후기", "기타"],
    categoryColors: WORK_REVIEW_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 업무후기 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 312, comments: 1, isPinned: true },
      { id: 8, title: "세종시 신도시 현장 3개월 후기", author: "현장일기", category: "현장후기", date: "2025-01-15", views: 456, comments: 15 },
      { id: 7, title: "두산 DX225 6천시간 장기사용 후기", author: "두산팬", category: "장비후기", date: "2025-01-14", views: 567, comments: 22 },
      { id: 6, title: "OO중기 업체 이용 후기", author: "솔직후기", category: "업체후기", date: "2025-01-13", views: 345, comments: 18 },
      { id: 5, title: "겨울 현장 작업 후기 (영하 15도)", author: "겨울전사", category: "현장후기", date: "2025-01-12", views: 289, comments: 11 },
      { id: 4, title: "히타치 ZX200-5G 1년 사용 솔직 후기", author: "장비수집가", category: "장비후기", date: "2025-01-11", views: 423, comments: 9 },
    ],
  },
  daily: {
    slug: "daily",
    title: "일상공유",
    description: "일상, 취미, 맛집 등 자유롭게 이야기를 나누세요",
    group: "기타",
    categories: ["전체", "일상", "취미", "맛집", "여행", "기타"],
    categoryColors: DAILY_COLORS,
    mockPosts: [
      { id: 1, title: "[공지] 일상공유 게시판 이용 안내", author: "관리자", category: "기타", date: "2025-01-15", views: 234, comments: 1, isPinned: true },
      { id: 8, title: "현장 근처 맛집 추천드립니다 (세종시)", author: "맛집탐방", category: "맛집", date: "2025-01-15", views: 345, comments: 12 },
      { id: 7, title: "주말에 낚시 다녀왔습니다", author: "낚시꾼", category: "취미", date: "2025-01-14", views: 198, comments: 8 },
      { id: 6, title: "제주도 가족여행 다녀온 후기", author: "여행러", category: "여행", date: "2025-01-13", views: 267, comments: 5 },
      { id: 5, title: "오늘 현장에서 있었던 웃긴 일", author: "웃음보", category: "일상", date: "2025-01-12", views: 456, comments: 21 },
      { id: 4, title: "캠핑 장비 추천 부탁드립니다", author: "캠핑초보", category: "취미", date: "2025-01-11", views: 178, comments: 14 },
    ],
  },
};

export function getBoardConfig(slug: string): BoardConfig | undefined {
  return BOARD_CONFIGS[slug];
}

export function getAllBoardSlugs(): string[] {
  return Object.keys(BOARD_CONFIGS);
}
