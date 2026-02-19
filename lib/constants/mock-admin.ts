// ──────────────────────────────────────────────
// Admin Mock Data & Types
// ──────────────────────────────────────────────

// ── Types ──

export type UserRole = "일반" | "업체" | "VIP" | "관리자";
export type UserStatus = "활성" | "정지" | "탈퇴";
export type ListingStatus = "판매중" | "예약중" | "판매완료" | "심사중" | "반려";
export type PostStatus = "게시중" | "숨김" | "삭제";
export type CompanyStatus = "승인" | "심사중" | "반려" | "정지";
export type RecruitStatus = "모집중" | "마감" | "삭제";
export type BannerPosition = "메인" | "VIP" | "사이드";
export type BannerStatus = "활성" | "비활성" | "예약";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  lastLoginAt: string;
  listingCount: number;
  postCount: number;
  company?: string;
}

export interface AdminListing {
  id: string;
  title: string;
  category: string;
  price: string;
  seller: string;
  sellerPhone: string;
  status: ListingStatus;
  createdAt: string;
  views: number;
  region: string;
  grade: string;
  year: number;
  listingType: "무료" | "유료";
}

export interface AdminPost {
  id: string;
  title: string;
  board: string;
  author: string;
  status: PostStatus;
  createdAt: string;
  views: number;
  comments: number;
  category: string;
  isNotice: boolean;
}

export interface AdminCompany {
  id: string;
  name: string;
  representative: string;
  phone: string;
  email: string;
  businessNumber: string;
  address: string;
  status: CompanyStatus;
  registeredAt: string;
  listingCount: number;
  type: string;
}

export interface AdminRecruit {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: RecruitStatus;
  createdAt: string;
  deadline: string;
  applicants: number;
  type: string;
}

export interface AdminBanner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: BannerPosition;
  status: BannerStatus;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  order: number;
}

export interface AdminCategory {
  id: string;
  label: string;
  slug: string;
  parentId: string | null;
  order: number;
  listingCount: number;
  children?: AdminCategory[];
}

export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalListings: number;
  newListingsToday: number;
  totalPosts: number;
  newPostsToday: number;
  pendingApprovals: number;
  pendingApprovalsChange: number;
}

export interface WeeklyData {
  day: string;
  신규회원: number;
  매물등록: number;
  게시글: number;
}

export interface MonthlyData {
  month: string;
  매출: number;
  거래: number;
}

export interface RecentActivity {
  id: string;
  type: "회원가입" | "매물등록" | "게시글" | "문의" | "업체등록" | "신고";
  message: string;
  time: string;
  user: string;
}

// ── Mock Data ──

export const DASHBOARD_STATS: DashboardStats = {
  totalUsers: 12847,
  newUsersToday: 23,
  totalListings: 3456,
  newListingsToday: 15,
  totalPosts: 8923,
  newPostsToday: 42,
  pendingApprovals: 7,
  pendingApprovalsChange: -3,
};

export const WEEKLY_DATA: WeeklyData[] = [
  { day: "월", 신규회원: 24, 매물등록: 18, 게시글: 35 },
  { day: "화", 신규회원: 31, 매물등록: 22, 게시글: 42 },
  { day: "수", 신규회원: 28, 매물등록: 15, 게시글: 38 },
  { day: "목", 신규회원: 35, 매물등록: 28, 게시글: 51 },
  { day: "금", 신규회원: 42, 매물등록: 32, 게시글: 47 },
  { day: "토", 신규회원: 18, 매물등록: 12, 게시글: 25 },
  { day: "일", 신규회원: 14, 매물등록: 8, 게시글: 19 },
];

export const MONTHLY_DATA: MonthlyData[] = [
  { month: "1월", 매출: 4200, 거래: 180 },
  { month: "2월", 매출: 3800, 거래: 165 },
  { month: "3월", 매출: 5100, 거래: 210 },
  { month: "4월", 매출: 4700, 거래: 195 },
  { month: "5월", 매출: 5600, 거래: 230 },
  { month: "6월", 매출: 6200, 거래: 255 },
  { month: "7월", 매출: 5800, 거래: 240 },
  { month: "8월", 매출: 5400, 거래: 220 },
  { month: "9월", 매출: 6100, 거래: 250 },
  { month: "10월", 매출: 6800, 거래: 275 },
  { month: "11월", 매출: 7200, 거래: 290 },
  { month: "12월", 매출: 6500, 거래: 260 },
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: "1", type: "회원가입", message: "김철수님이 회원가입했습니다", time: "5분 전", user: "김철수" },
  { id: "2", type: "매물등록", message: "현대 220LC-9S 굴삭기 매물이 등록되었습니다", time: "12분 전", user: "이영희" },
  { id: "3", type: "게시글", message: "자유게시판에 새 글이 작성되었습니다", time: "23분 전", user: "박민수" },
  { id: "4", type: "업체등록", message: "(주)한국중장비가 업체 등록을 신청했습니다", time: "35분 전", user: "최동현" },
  { id: "5", type: "신고", message: "매물 #3421에 대한 신고가 접수되었습니다", time: "1시간 전", user: "정수진" },
  { id: "6", type: "문의", message: "배너 광고 문의가 접수되었습니다", time: "1시간 전", user: "강하영" },
  { id: "7", type: "매물등록", message: "두산 DX225LCA 매물이 등록되었습니다", time: "2시간 전", user: "윤성호" },
  { id: "8", type: "회원가입", message: "송미경님이 회원가입했습니다", time: "2시간 전", user: "송미경" },
];

export const MOCK_USERS: AdminUser[] = [
  { id: "U001", name: "김철수", email: "kimcs@email.com", phone: "010-1234-5678", role: "일반", status: "활성", registeredAt: "2024-01-15", lastLoginAt: "2025-01-18", listingCount: 3, postCount: 12, company: undefined },
  { id: "U002", name: "이영희", email: "leeyh@email.com", phone: "010-2345-6789", role: "업체", status: "활성", registeredAt: "2024-02-20", lastLoginAt: "2025-01-19", listingCount: 15, postCount: 8, company: "(주)영희중장비" },
  { id: "U003", name: "박민수", email: "parkms@email.com", phone: "010-3456-7890", role: "VIP", status: "활성", registeredAt: "2023-11-05", lastLoginAt: "2025-01-19", listingCount: 42, postCount: 25, company: "민수건설기계" },
  { id: "U004", name: "최동현", email: "choidh@email.com", phone: "010-4567-8901", role: "업체", status: "정지", registeredAt: "2024-03-10", lastLoginAt: "2024-12-01", listingCount: 8, postCount: 3, company: "(주)한국중장비" },
  { id: "U005", name: "정수진", email: "jeongsj@email.com", phone: "010-5678-9012", role: "일반", status: "활성", registeredAt: "2024-05-22", lastLoginAt: "2025-01-17", listingCount: 1, postCount: 45, company: undefined },
  { id: "U006", name: "강하영", email: "kanghy@email.com", phone: "010-6789-0123", role: "일반", status: "탈퇴", registeredAt: "2024-01-30", lastLoginAt: "2024-10-15", listingCount: 0, postCount: 2, company: undefined },
  { id: "U007", name: "윤성호", email: "yoonsh@email.com", phone: "010-7890-1234", role: "VIP", status: "활성", registeredAt: "2023-09-12", lastLoginAt: "2025-01-19", listingCount: 67, postCount: 18, company: "성호기계" },
  { id: "U008", name: "송미경", email: "songmk@email.com", phone: "010-8901-2345", role: "업체", status: "활성", registeredAt: "2024-06-18", lastLoginAt: "2025-01-18", listingCount: 22, postCount: 7, company: "미경건기" },
  { id: "U009", name: "한정우", email: "hanjw@email.com", phone: "010-9012-3456", role: "일반", status: "활성", registeredAt: "2024-08-01", lastLoginAt: "2025-01-16", listingCount: 2, postCount: 30, company: undefined },
  { id: "U010", name: "임다은", email: "limde@email.com", phone: "010-0123-4567", role: "관리자", status: "활성", registeredAt: "2023-06-01", lastLoginAt: "2025-01-19", listingCount: 0, postCount: 5, company: undefined },
  { id: "U011", name: "오재현", email: "ohjh@email.com", phone: "010-1111-2222", role: "업체", status: "활성", registeredAt: "2024-04-12", lastLoginAt: "2025-01-18", listingCount: 31, postCount: 9, company: "재현중기" },
  { id: "U012", name: "배수아", email: "baesa@email.com", phone: "010-3333-4444", role: "일반", status: "활성", registeredAt: "2024-07-25", lastLoginAt: "2025-01-14", listingCount: 0, postCount: 55, company: undefined },
];

export const MOCK_ADMIN_LISTINGS: AdminListing[] = [
  { id: "L001", title: "현대 220LC-9S 굴삭기", category: "굴삭기", price: "4,500만원", seller: "이영희", sellerPhone: "010-2345-6789", status: "판매중", createdAt: "2025-01-18", views: 342, region: "경기 화성", grade: "A", year: 2019, listingType: "유료" },
  { id: "L002", title: "두산 DX225LCA 굴삭기", category: "굴삭기", price: "5,200만원", seller: "윤성호", sellerPhone: "010-7890-1234", status: "판매중", createdAt: "2025-01-17", views: 287, region: "경남 창원", grade: "A+", year: 2020, listingType: "유료" },
  { id: "L003", title: "볼보 EC210B 굴삭기", category: "굴삭기", price: "3,800만원", seller: "박민수", sellerPhone: "010-3456-7890", status: "예약중", createdAt: "2025-01-16", views: 521, region: "전북 전주", grade: "B+", year: 2017, listingType: "무료" },
  { id: "L004", title: "현대 15톤 덤프트럭", category: "덤퍼트럭", price: "3,200만원", seller: "최동현", sellerPhone: "010-4567-8901", status: "심사중", createdAt: "2025-01-19", views: 45, region: "서울 강서", grade: "B", year: 2018, listingType: "무료" },
  { id: "L005", title: "삼성 SL08 지게차", category: "지게차", price: "1,800만원", seller: "오재현", sellerPhone: "010-1111-2222", status: "판매완료", createdAt: "2025-01-10", views: 892, region: "충남 천안", grade: "A-", year: 2021, listingType: "유료" },
  { id: "L006", title: "코벨코 SK200 굴삭기", category: "굴삭기", price: "4,100만원", seller: "송미경", sellerPhone: "010-8901-2345", status: "판매중", createdAt: "2025-01-15", views: 198, region: "경기 안산", grade: "A", year: 2019, listingType: "무료" },
  { id: "L007", title: "두산 25톤 덤프트럭", category: "덤퍼트럭", price: "4,800만원", seller: "박민수", sellerPhone: "010-3456-7890", status: "반려", createdAt: "2025-01-14", views: 67, region: "강원 원주", grade: "C+", year: 2015, listingType: "무료" },
  { id: "L008", title: "타다노 TR250M 크레인", category: "크레인", price: "8,500만원", seller: "윤성호", sellerPhone: "010-7890-1234", status: "판매중", createdAt: "2025-01-13", views: 445, region: "부산 사상", grade: "A+", year: 2022, listingType: "유료" },
  { id: "L009", title: "캐터필러 320D 굴삭기", category: "굴삭기", price: "5,000만원", seller: "이영희", sellerPhone: "010-2345-6789", status: "판매중", createdAt: "2025-01-12", views: 376, region: "인천 남동", grade: "A", year: 2020, listingType: "유료" },
  { id: "L010", title: "현대 로더 HL760-9", category: "로더", price: "6,200만원", seller: "한정우", sellerPhone: "010-9012-3456", status: "심사중", createdAt: "2025-01-19", views: 23, region: "대전 유성", grade: "A-", year: 2021, listingType: "무료" },
];

export const MOCK_POSTS: AdminPost[] = [
  { id: "P001", title: "굴삭기 시세 문의합니다", board: "매매", author: "김철수", status: "게시중", createdAt: "2025-01-19", views: 156, comments: 8, category: "매매문의", isNotice: false },
  { id: "P002", title: "건설기계 자격증 시험 후기", board: "자격증", author: "정수진", status: "게시중", createdAt: "2025-01-18", views: 423, comments: 15, category: "시험후기", isNotice: false },
  { id: "P003", title: "[공지] 2025년 이용약관 변경 안내", board: "자유", author: "관리자", status: "게시중", createdAt: "2025-01-17", views: 1205, comments: 3, category: "공지", isNotice: true },
  { id: "P004", title: "중고 굴삭기 구매 시 주의사항", board: "자유", author: "박민수", status: "게시중", createdAt: "2025-01-16", views: 687, comments: 22, category: "정보", isNotice: false },
  { id: "P005", title: "덤프트럭 넘버 양도 가능한가요?", board: "매매", author: "한정우", status: "게시중", createdAt: "2025-01-15", views: 234, comments: 11, category: "넘버매매", isNotice: false },
  { id: "P006", title: "불법 광고 게시글입니다 (신고)", board: "자유", author: "배수아", status: "숨김", createdAt: "2025-01-14", views: 89, comments: 1, category: "자유", isNotice: false },
  { id: "P007", title: "기중기 운전기능사 준비 방법", board: "자격증", author: "송미경", status: "게시중", createdAt: "2025-01-13", views: 356, comments: 19, category: "자격정보", isNotice: false },
  { id: "P008", title: "현장 일하면서 느낀 점", board: "자유", author: "오재현", status: "게시중", createdAt: "2025-01-12", views: 198, comments: 7, category: "일상", isNotice: false },
  { id: "P009", title: "스팸성 광고글", board: "매매", author: "탈퇴회원", status: "삭제", createdAt: "2025-01-11", views: 12, comments: 0, category: "매매문의", isNotice: false },
  { id: "P010", title: "굴삭기 기능사 합격 꿀팁 공유", board: "자격증", author: "정수진", status: "게시중", createdAt: "2025-01-10", views: 892, comments: 34, category: "시험후기", isNotice: false },
];

export const MOCK_COMPANIES: AdminCompany[] = [
  { id: "C001", name: "(주)영희중장비", representative: "이영희", phone: "031-123-4567", email: "info@yhce.co.kr", businessNumber: "123-45-67890", address: "경기도 화성시 동탄대로 123", status: "승인", registeredAt: "2024-02-20", listingCount: 15, type: "매매/렌탈" },
  { id: "C002", name: "(주)한국중장비", representative: "최동현", phone: "02-456-7890", email: "contact@khce.co.kr", businessNumber: "234-56-78901", address: "서울 강서구 마곡중앙로 45", status: "정지", registeredAt: "2024-03-10", listingCount: 8, type: "매매" },
  { id: "C003", name: "민수건설기계", representative: "박민수", phone: "063-789-0123", email: "mscc@naver.com", businessNumber: "345-67-89012", address: "전북 전주시 덕진구 만성로 67", status: "승인", registeredAt: "2023-11-05", listingCount: 42, type: "매매/정비" },
  { id: "C004", name: "성호기계", representative: "윤성호", phone: "055-012-3456", email: "shmc@gmail.com", businessNumber: "456-78-90123", address: "경남 창원시 의창구 창이대로 89", status: "승인", registeredAt: "2023-09-12", listingCount: 67, type: "매매/렌탈/정비" },
  { id: "C005", name: "미경건기", representative: "송미경", phone: "031-345-6789", email: "mkce@email.com", businessNumber: "567-89-01234", address: "경기도 안산시 상록구 해안로 111", status: "승인", registeredAt: "2024-06-18", listingCount: 22, type: "매매" },
  { id: "C006", name: "재현중기", representative: "오재현", phone: "041-678-9012", email: "jhce@email.com", businessNumber: "678-90-12345", address: "충남 천안시 서북구 두정로 33", status: "승인", registeredAt: "2024-04-12", listingCount: 31, type: "렌탈" },
  { id: "C007", name: "대한건기(주)", representative: "장대한", phone: "032-901-2345", email: "dhce@email.com", businessNumber: "789-01-23456", address: "인천 남동구 남동대로 55", status: "심사중", registeredAt: "2025-01-18", listingCount: 0, type: "매매/렌탈" },
  { id: "C008", name: "서울중기산업", representative: "김서울", phone: "02-234-5678", email: "seoulce@email.com", businessNumber: "890-12-34567", address: "서울 금천구 가산디지털로 77", status: "반려", registeredAt: "2025-01-10", listingCount: 0, type: "정비" },
];

export const MOCK_RECRUITS: AdminRecruit[] = [
  { id: "R001", title: "굴삭기 운전원 모집", company: "민수건설기계", location: "전북 전주", salary: "월 350만원~", status: "모집중", createdAt: "2025-01-18", deadline: "2025-02-18", applicants: 12, type: "정규직" },
  { id: "R002", title: "덤프트럭 기사 급구", company: "(주)영희중장비", location: "경기 화성", salary: "월 400만원~", status: "모집중", createdAt: "2025-01-17", deadline: "2025-02-01", applicants: 8, type: "계약직" },
  { id: "R003", title: "정비기사 채용", company: "성호기계", location: "경남 창원", salary: "월 300만원~", status: "모집중", createdAt: "2025-01-15", deadline: "2025-02-15", applicants: 5, type: "정규직" },
  { id: "R004", title: "크레인 운전원", company: "재현중기", location: "충남 천안", salary: "일 25만원", status: "마감", createdAt: "2025-01-10", deadline: "2025-01-17", applicants: 20, type: "일용직" },
  { id: "R005", title: "중장비 영업직원 모집", company: "(주)한국중장비", location: "서울 강서", salary: "월 280만원+인센티브", status: "모집중", createdAt: "2025-01-14", deadline: "2025-02-14", applicants: 15, type: "정규직" },
  { id: "R006", title: "지게차 운전원 구합니다", company: "미경건기", location: "경기 안산", salary: "월 320만원~", status: "모집중", createdAt: "2025-01-16", deadline: "2025-02-16", applicants: 7, type: "계약직" },
  { id: "R007", title: "현장 사무직원", company: "민수건설기계", location: "전북 전주", salary: "월 250만원~", status: "삭제", createdAt: "2025-01-05", deadline: "2025-01-20", applicants: 3, type: "정규직" },
  { id: "R008", title: "로더 운전원 모집", company: "성호기계", location: "경남 창원", salary: "월 380만원~", status: "모집중", createdAt: "2025-01-19", deadline: "2025-02-19", applicants: 2, type: "정규직" },
];

export const MOCK_BANNERS: AdminBanner[] = [
  { id: "B001", title: "2025 신년 이벤트", imageUrl: "/images/banner-event.jpg", linkUrl: "/event/new-year", position: "메인", status: "활성", startDate: "2025-01-01", endDate: "2025-01-31", clicks: 1256, impressions: 45230, order: 1 },
  { id: "B002", title: "VIP 회원 혜택 안내", imageUrl: "/images/banner-vip.jpg", linkUrl: "/vip", position: "메인", status: "활성", startDate: "2024-12-01", endDate: "2025-03-31", clicks: 892, impressions: 38100, order: 2 },
  { id: "B003", title: "성호기계 VIP 광고", imageUrl: "/images/banner-sh.jpg", linkUrl: "/companies/C004", position: "VIP", status: "활성", startDate: "2025-01-01", endDate: "2025-06-30", clicks: 445, impressions: 12300, order: 1 },
  { id: "B004", title: "영희중장비 VIP 광고", imageUrl: "/images/banner-yh.jpg", linkUrl: "/companies/C001", position: "VIP", status: "활성", startDate: "2025-01-01", endDate: "2025-06-30", clicks: 367, impressions: 11800, order: 2 },
  { id: "B005", title: "건설기계 자격증 안내", imageUrl: "/images/banner-license.jpg", linkUrl: "/board/license-info", position: "사이드", status: "활성", startDate: "2025-01-01", endDate: "2025-12-31", clicks: 234, impressions: 8900, order: 1 },
  { id: "B006", title: "봄맞이 특가전 예정", imageUrl: "/images/banner-spring.jpg", linkUrl: "/event/spring", position: "메인", status: "예약", startDate: "2025-03-01", endDate: "2025-03-31", clicks: 0, impressions: 0, order: 3 },
  { id: "B007", title: "앱 다운로드 배너", imageUrl: "/images/banner-app.jpg", linkUrl: "/app-download", position: "사이드", status: "비활성", startDate: "2024-06-01", endDate: "2024-12-31", clicks: 567, impressions: 15600, order: 2 },
];

export const MOCK_ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: "CAT01", label: "굴삭기/어태치부속", slug: "excavator", parentId: null, order: 1, listingCount: 1245,
    children: [
      { id: "CAT01-1", label: "굴삭기 1.3㎥이상", slug: "large", parentId: "CAT01", order: 1, listingCount: 420 },
      { id: "CAT01-2", label: "굴삭기 1.0㎥이상", slug: "medium", parentId: "CAT01", order: 2, listingCount: 380 },
      { id: "CAT01-3", label: "미니굴삭기", slug: "mini", parentId: "CAT01", order: 3, listingCount: 265 },
      { id: "CAT01-4", label: "굴삭기타이어식", slug: "wheeled", parentId: "CAT01", order: 4, listingCount: 85 },
      { id: "CAT01-5", label: "어태치먼트", slug: "attachment", parentId: "CAT01", order: 5, listingCount: 62 },
      { id: "CAT01-6", label: "굴삭기부속", slug: "parts", parentId: "CAT01", order: 6, listingCount: 33 },
    ],
  },
  {
    id: "CAT02", label: "덤퍼트럭/추레라", slug: "dump-truck", parentId: null, order: 2, listingCount: 567,
    children: [
      { id: "CAT02-1", label: "15톤 덤프트럭", slug: "15ton", parentId: "CAT02", order: 1, listingCount: 210 },
      { id: "CAT02-2", label: "25톤 덤프트럭", slug: "25ton", parentId: "CAT02", order: 2, listingCount: 185 },
      { id: "CAT02-3", label: "축덤프", slug: "axle", parentId: "CAT02", order: 3, listingCount: 92 },
      { id: "CAT02-4", label: "추레라", slug: "trailer", parentId: "CAT02", order: 4, listingCount: 55 },
      { id: "CAT02-5", label: "덤프부속", slug: "parts", parentId: "CAT02", order: 5, listingCount: 25 },
    ],
  },
  {
    id: "CAT03", label: "믹서트럭/펌프카", slug: "mixer-truck", parentId: null, order: 3, listingCount: 234,
    children: [
      { id: "CAT03-1", label: "믹서트럭", slug: "mixer", parentId: "CAT03", order: 1, listingCount: 120 },
      { id: "CAT03-2", label: "펌프카", slug: "pump", parentId: "CAT03", order: 2, listingCount: 89 },
      { id: "CAT03-3", label: "믹서/펌프부속", slug: "parts", parentId: "CAT03", order: 3, listingCount: 25 },
    ],
  },
  {
    id: "CAT04", label: "지게차/하이랜더", slug: "forklift", parentId: null, order: 4, listingCount: 345,
    children: [
      { id: "CAT04-1", label: "지게차", slug: "forklift", parentId: "CAT04", order: 1, listingCount: 210 },
      { id: "CAT04-2", label: "하이랜더", slug: "highlander", parentId: "CAT04", order: 2, listingCount: 78 },
      { id: "CAT04-3", label: "스키드로더", slug: "skid-loader", parentId: "CAT04", order: 3, listingCount: 35 },
      { id: "CAT04-4", label: "지게차부속", slug: "parts", parentId: "CAT04", order: 4, listingCount: 22 },
    ],
  },
  {
    id: "CAT05", label: "크레인/카고크레인", slug: "crane", parentId: null, order: 5, listingCount: 289,
    children: [
      { id: "CAT05-1", label: "카고크레인", slug: "cargo-crane", parentId: "CAT05", order: 1, listingCount: 145 },
      { id: "CAT05-2", label: "타워크레인", slug: "tower", parentId: "CAT05", order: 2, listingCount: 67 },
      { id: "CAT05-3", label: "크롤러크레인", slug: "crawler", parentId: "CAT05", order: 3, listingCount: 42 },
      { id: "CAT05-4", label: "기중기", slug: "hoist", parentId: "CAT05", order: 4, listingCount: 23 },
      { id: "CAT05-5", label: "크레인부속", slug: "parts", parentId: "CAT05", order: 5, listingCount: 12 },
    ],
  },
  {
    id: "CAT06", label: "로더/도저/그레이더", slug: "loader", parentId: null, order: 6, listingCount: 198,
    children: [
      { id: "CAT06-1", label: "로더", slug: "loader", parentId: "CAT06", order: 1, listingCount: 98 },
      { id: "CAT06-2", label: "불도저", slug: "bulldozer", parentId: "CAT06", order: 2, listingCount: 56 },
      { id: "CAT06-3", label: "그레이더", slug: "grader", parentId: "CAT06", order: 3, listingCount: 28 },
      { id: "CAT06-4", label: "로더부속", slug: "parts", parentId: "CAT06", order: 4, listingCount: 16 },
    ],
  },
];

// ── Helper functions ──

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // User
    "활성": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "정지": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "탈퇴": "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    // Listing
    "판매중": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "예약중": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "판매완료": "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    "심사중": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    "반려": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    // Post
    "게시중": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "숨김": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "삭제": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    // Company
    "승인": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    // Recruit
    "모집중": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "마감": "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    // Banner
    "비활성": "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    "예약": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return colors[status] || "bg-gray-100 text-gray-500";
}

export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    "일반": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    "업체": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "VIP": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "관리자": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return colors[role];
}
