const currentYear = new Date().getFullYear()

export const YEAR_OPTIONS = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => {
    const year = String(currentYear - i)
    return { value: year, label: year }
  }
)

export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const month = String(i + 1).padStart(2, "0")
  return { value: month, label: `${month}월` }
})

export const CONDITION_OPTIONS = [
  { value: "A+", label: "A+ (최상)" },
  { value: "A", label: "A (상)" },
  { value: "A-", label: "A- (상하)" },
  { value: "B+", label: "B+ (중상)" },
  { value: "B", label: "B (중)" },
  { value: "B-", label: "B- (중하)" },
  { value: "C+", label: "C+ (하상)" },
  { value: "C", label: "C (하)" },
  { value: "C-", label: "C- (최하)" },
]

export const REGION_OPTIONS = [
  { value: "서울", label: "서울" },
  { value: "경기", label: "경기" },
  { value: "인천", label: "인천" },
  { value: "강원", label: "강원" },
  { value: "충북", label: "충북" },
  { value: "충남", label: "충남" },
  { value: "대전", label: "대전" },
  { value: "세종", label: "세종" },
  { value: "전북", label: "전북" },
  { value: "전남", label: "전남" },
  { value: "광주", label: "광주" },
  { value: "경북", label: "경북" },
  { value: "경남", label: "경남" },
  { value: "대구", label: "대구" },
  { value: "울산", label: "울산" },
  { value: "부산", label: "부산" },
  { value: "제주", label: "제주" },
]

export const TRANSMISSION_OPTIONS = [
  { value: "자동", label: "자동" },
  { value: "수동", label: "수동" },
  { value: "기타", label: "기타" },
]

export const CATEGORY_OPTIONS = [
  { value: "굴삭기", label: "굴삭기" },
  { value: "지게차", label: "지게차" },
  { value: "크레인", label: "크레인" },
  { value: "로더", label: "로더" },
  { value: "불도저", label: "불도저" },
  { value: "덤프트럭", label: "덤프트럭" },
  { value: "콘크리트펌프", label: "콘크리트펌프" },
  { value: "롤러", label: "롤러" },
  { value: "그레이더", label: "그레이더" },
  { value: "스크레이퍼", label: "스크레이퍼" },
  { value: "천공기", label: "천공기" },
  { value: "항타기", label: "항타기" },
  { value: "기타", label: "기타" },
]

export const PAYMENT_OPTIONS = [
  { value: "현금", label: "현금" },
  { value: "할부", label: "할부" },
  { value: "협의", label: "협의" },
]

export const UNDERCARRIAGE_TYPE_OPTIONS = [
  { value: "철(STEEL)", label: "철(STEEL)" },
  { value: "고무(RUBBER)", label: "고무(RUBBER)" },
  { value: "타이어(WHEEL)", label: "타이어(WHEEL)" },
  { value: "기타", label: "기타" },
]

export const UNDERCARRIAGE_CONDITION_OPTIONS = [
  { value: "상", label: "상" },
  { value: "중", label: "중" },
  { value: "하", label: "하" },
  { value: "교체필요", label: "교체필요" },
]

export const PHOTO_SLOT_LABELS = [
  "대표사진",
  "사진 2",
  "사진 3",
  "사진 4",
  "사진 5",
  "사진 6",
  "사진 7",
  "사진 8",
  "사진 9",
  "사진 10",
]
