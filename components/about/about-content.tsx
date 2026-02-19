import {
  IconBuildingSkyscraper,
  IconTargetArrow,
  IconUsers,
  IconTruck,
  IconShieldCheck,
  IconHeadset,
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconCalendar,
} from "@tabler/icons-react";

// ─── History Data ────────────────────────────────────
const HISTORY = [
  {
    year: "2024",
    events: [
      "건설장비 종합 플랫폼 '중기나라' 리뉴얼 오픈",
      "월간 방문자 50만 돌파",
      "모바일 앱 출시",
    ],
  },
  {
    year: "2022",
    events: ["구인구직 서비스 오픈", "자유게시판 / 주요양식 서비스 추가"],
  },
  {
    year: "2020",
    events: ["업체찾기/등록 서비스 런칭", "누적 매물 등록 10,000건 돌파"],
  },
  {
    year: "2018",
    events: ["VIP 프리미엄 매물 서비스 도입", "전국 업체 네트워크 구축"],
  },
  {
    year: "2015",
    events: ["중기나라 온라인 서비스 오픈", "건설기계 매매 중개 서비스 시작"],
  },
  { year: "2010", events: ["중기나라 법인 설립"] },
];

// ─── Service Data ────────────────────────────────────
const SERVICES = [
  {
    icon: <IconTruck className="h-8 w-8" />,
    title: "중장비 매매",
    description:
      "굴착기, 덤프트럭, 크레인 등 전 기종 매매 중개. VIP 프리미엄 서비스로 빠른 거래를 지원합니다.",
  },
  {
    icon: <IconBuildingSkyscraper className="h-8 w-8" />,
    title: "업체찾기/등록",
    description:
      "전국 건설장비 매매/정비/임대 업체를 한눈에 찾고, 내 업체를 등록하여 홍보할 수 있습니다.",
  },
  {
    icon: <IconUsers className="h-8 w-8" />,
    title: "구인/구직",
    description:
      "건설장비 운전기사, 정비사, 현장관리 등 전문 인력 채용과 구직 서비스를 제공합니다.",
  },
  {
    icon: <IconShieldCheck className="h-8 w-8" />,
    title: "안전한 거래",
    description:
      "허위 매물 방지 시스템과 신뢰도 검증을 통해 안전하고 투명한 거래 환경을 보장합니다.",
  },
  {
    icon: <IconHeadset className="h-8 w-8" />,
    title: "전문 상담",
    description:
      "건설장비 전문 상담사가 매매부터 등록, 보험, 검사까지 원스톱으로 안내해드립니다.",
  },
  {
    icon: <IconTargetArrow className="h-8 w-8" />,
    title: "주요양식 제공",
    description:
      "매매계약서, 양도증명서, 등록신청서 등 건설장비 거래에 필요한 모든 양식을 제공합니다.",
  },
];

// ─── Stats ───────────────────────────────────────────
const STATS = [
  { label: "누적 매물 등록", value: "25,000+", unit: "건" },
  { label: "등록 업체", value: "3,200+", unit: "개" },
  { label: "월간 방문자", value: "50만+", unit: "명" },
  { label: "서비스 운영", value: "15", unit: "년" },
];

// ─── Component ───────────────────────────────────────
export function AboutContent() {
  return (
    <div className="space-y-10">
      {/* ═══ Hero ═══ */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl dark:text-neutral-100">
          중기나라
        </h1>
        <p className="mt-1 text-base font-medium text-primary">
          대한민국 No.1 건설장비 종합 플랫폼
        </p>
        <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
          중기나라는 2010년 설립 이후, 건설장비 매매를 중심으로 업체찾기,
          구인구직, 주요양식 제공 등 건설장비에 관한 모든 서비스를 한 곳에서
          제공하고 있습니다. 전국의 건설장비 종사자분들이 편리하고 안전하게
          이용할 수 있는 신뢰받는 플랫폼이 되겠습니다.
        </p>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="border border-neutral-200 bg-neutral-50 p-4 text-center dark:border-neutral-800 dark:bg-neutral-800/50"
          >
            <p className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* ═══ Services ═══ */}
      <section>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          주요 서비스
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="text-primary">{svc.icon}</div>
              <h3 className="mt-3 text-base font-bold text-neutral-900 dark:text-neutral-100">
                {svc.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ History ═══ */}
      <section>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          연혁
        </h2>
        <div className="mt-4 space-y-0">
          {HISTORY.map((item, idx) => (
            <div key={item.year} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-neutral-300 bg-neutral-900 text-xs font-bold text-white dark:border-neutral-600 dark:bg-neutral-100 dark:text-neutral-900">
                  <IconCalendar className="h-4 w-4" />
                </div>
                {idx < HISTORY.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                )}
              </div>
              {/* Content */}
              <div className="pt-1">
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {item.year}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {item.events.map((event, i) => (
                    <li
                      key={i}
                      className="text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Company Info ═══ */}
      <section className="border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50">
        <div className="border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            회사 정보
          </h2>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          <InfoRow
            icon={<IconBuildingSkyscraper className="h-4 w-4" />}
            label="회사명"
            value="중기나라 (주)"
          />
          <InfoRow
            icon={<IconMapPin className="h-4 w-4" />}
            label="주소"
            value="서울특별시 강남구 테헤란로70길 12, 한서빌딩 5층"
          />
          <InfoRow
            icon={<IconPhone className="h-4 w-4" />}
            label="대표전화"
            value="070-7737-5000"
          />
          <InfoRow
            icon={<IconMail className="h-4 w-4" />}
            label="이메일"
            value="contact@silmaril.io"
          />
          <InfoRow
            icon={<IconClock className="h-4 w-4" />}
            label="운영시간"
            value="평일 09:00 ~ 18:00 (토·일·공휴일 휴무)"
          />
          <InfoRow
            icon={<IconCalendar className="h-4 w-4" />}
            label="설립일"
            value="2010년 3월"
          />
        </div>
      </section>
    </div>
  );
}

// ─── Sub-Component ───────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <span className="text-neutral-400 dark:text-neutral-500">{icon}</span>
      <span className="w-20 flex-shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm text-neutral-900 dark:text-neutral-100">
        {value}
      </span>
    </div>
  );
}
