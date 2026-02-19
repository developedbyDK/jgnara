import Link from "next/link";

export function Footer() {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="border-b border-neutral-200 pb-2 dark:border-neutral-700">
          <div className="mb-10 max-w-xl">
            <Logo />
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              중장비 매매, 업체찾기, 일감찾기, 구인구직까지.
              <br /> 중기나라에서 중장비에 관한 모든 것을 한 곳에서 해결하세요.
            </p>
            <div className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
              <p>
                <span className="text-neutral-600 dark:text-neutral-300">
                  실마릴테크놀로지스 주식회사
                </span>
                {" | "}대표: 김요한
              </p>
              <p>서울특별시 강남구 테헤란로70길 12, 402호(대치동, H타워)</p>
              <p>
                사업자번호: 532-87-03387
                {" | "}통신판매업: 제2026-서울강남-00538호
              </p>
              <p>
                대표번호{" "}
                <Link
                  href="tel:070-7737-5000"
                  className="cursor-pointer font-medium text-neutral-700 underline dark:text-neutral-300"
                >
                  070-7737-5000
                </Link>
                {" | "}이메일{" "}
                <Link
                  href="mailto:contact@silmaril.io"
                  className="cursor-pointer font-medium text-neutral-700 underline dark:text-neutral-300"
                >
                  contact@silmaril.io
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 border-b border-neutral-200 pt-10 pb-10 md:grid-cols-4 dark:border-neutral-700">
          <FooterColumn title="서비스" items={SERVICES} />
          <FooterColumn title="게시판" items={BOARD} />
          <FooterColumn title="고객지원" items={SUPPORT} />
          <FooterColumn title="법적 고지" items={LEGALS} />
        </div>
        <p className="pt-10 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
          중기나라는 중장비 매매를 위한 정보 제공 플랫폼으로, 회원 간 직접
          거래에 대한 어떠한 책임도 지지 않습니다. 거래 시 매매 대상 장비의
          상태, 소유권, 가격 등을 반드시 직접 확인하시기 바라며, 모든 거래에
          따른 책임은 거래 당사자에게 있습니다.
        </p>
        <p className="mt-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} 중기나라. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

const SERVICES = [
  { title: "매물등록", href: "/listings/register" },
  { title: "업체찾기", href: "/companies" },
  { title: "업체등록", href: "/companies/register" },
  { title: "구인", href: "/recruit" },
  { title: "구직", href: "/jobs" },
];

const BOARD = [
  { title: "매물 삽니다", href: "/board/buy" },
  { title: "매물 팝니다", href: "/board/sell" },
  { title: "번호판 삽니다", href: "/board/plate-buy" },
  { title: "번호판 팝니다", href: "/board/plate-sell" },
  { title: "자유게시판", href: "/board/free" },
];

const SUPPORT = [
  { title: "회사소개", href: "/about" },
  { title: "주요양식", href: "/forms" },
  { title: "자주 묻는 질문", href: "/faq" },
  { title: "문의하기", href: "/contact" },
  { title: "광고안내", href: "/advertising" },
];

const LEGALS = [
  { title: "이용약관", href: "/terms" },
  { title: "개인정보처리방침", href: "/privacy" },
  { title: "쿠키정책", href: "/cookies" },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <ul className="text-base font-medium text-neutral-800 dark:text-neutral-200">
      <li className="mb-4 text-sm font-bold text-black dark:text-white">
        {title}
      </li>
      {items.map((item, idx) => (
        <li key={idx} className="mb-4 text-sm font-normal">
          <Link
            href={item.href}
            className="cursor-pointer text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center py-6 text-4xl tracking-tight"
      style={{ fontFamily: "'EutmanEungtteong', sans-serif" }}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-3xl font-bold text-white">
        J
      </span>
      <span className="ml-1.5 text-orange-500">중기</span>
      <span className="text-orange-600">나라</span>
    </Link>
  );
};
