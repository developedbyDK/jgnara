import Link from "next/link";

// ─── Shared Styles ──────────────────────────────────
const sectionTitle =
  "text-base font-bold text-neutral-900 dark:text-neutral-100";
const paragraph =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";
const listItem =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";

// ─── Component ──────────────────────────────────────
export function CookiesContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl dark:text-neutral-100">
          쿠키정책
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          시행일자: 2024년 1월 1일 | 최종 수정일: 2024년 12월 1일
        </p>
      </section>

      <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <p className={paragraph}>
            중기나라 (주) (이하 &quot;회사&quot;)는 이용자에게 더 나은 서비스를
            제공하기 위해 쿠키(Cookie)를 사용합니다. 본 쿠키정책은 회사가 쿠키를
            어떻게, 왜 사용하는지, 이용자가 쿠키를 어떻게 관리할 수 있는지에
            대해 설명합니다.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {/* 제1조 */}
          <Article title="제1조 (쿠키란 무엇인가)">
            <p className={paragraph}>
              쿠키(Cookie)란 웹사이트를 운영하는 데 이용되는 서버가 이용자의
              브라우저에 보내는 아주 작은 텍스트 파일로, 이용자의 컴퓨터
              하드디스크에 저장됩니다. 이후 이용자가 웹사이트에 다시 방문할 때
              웹사이트 서버는 이용자의 하드디스크에 저장되어 있는 쿠키의 내용을
              읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공합니다.
            </p>
            <p className={`mt-2 ${paragraph}`}>
              쿠키는 개인을 식별하는 정보를 자동적·능동적으로 수집하지 않으며,
              이용자는 언제든지 쿠키의 설치를 거부하거나 삭제할 수 있습니다.
            </p>
          </Article>

          {/* 제2조 */}
          <Article title="제2조 (쿠키의 사용 목적)">
            <p className={paragraph}>
              회사는 다음의 목적을 위하여 쿠키를 사용합니다.
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li className={listItem}>
                <strong>필수 쿠키</strong>: 웹사이트의 기본적인 기능을 보장하기
                위해 반드시 필요한 쿠키입니다. 로그인 상태 유지, 보안 인증,
                서비스 이용 등에 사용됩니다.
              </li>
              <li className={listItem}>
                <strong>기능 쿠키</strong>: 이용자의 선호 설정(언어, 지역 등)을
                기억하여 보다 편리한 서비스를 제공하기 위해 사용됩니다.
              </li>
              <li className={listItem}>
                <strong>분석 쿠키</strong>: 이용자의 서비스 이용 패턴을 분석하여
                서비스를 개선하기 위해 사용됩니다. 방문 페이지, 접속 시간, 이용
                빈도 등의 정보를 수집합니다.
              </li>
              <li className={listItem}>
                <strong>광고 쿠키</strong>: 이용자의 관심사에 기반한 맞춤 광고를
                제공하기 위해 사용됩니다.
              </li>
            </ol>
          </Article>

          {/* 제3조 */}
          <Article title="제3조 (사용하는 쿠키의 종류)">
            <div className="mt-1 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      쿠키명
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      유형
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      목적
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      보유 기간
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      session_id
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      필수
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      로그인 세션 유지
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      세션 종료 시
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      csrf_token
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      필수
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      보안(CSRF 방지)
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      세션 종료 시
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      user_pref
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      기능
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      사용자 설정 저장 (다크모드, 정렬 등)
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      1년
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      recent_views
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      기능
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      최근 본 매물 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      30일
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      _ga / _gid
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      분석
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      Google Analytics 웹사이트 이용 분석
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      2년 / 24시간
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      _fbp
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      광고
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      Facebook 광고 성과 측정
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      90일
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Article>

          {/* 제4조 */}
          <Article title="제4조 (제3자 쿠키)">
            <p className={paragraph}>
              회사는 서비스 분석 및 광고를 위해 제3자가 설정하는 쿠키를 사용할
              수 있습니다. 주요 제3자 쿠키 제공자는 다음과 같습니다.
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li className={listItem}>
                <strong>Google Analytics</strong>: 웹사이트 트래픽 분석 및
                서비스 개선 목적. Google의 개인정보처리방침에 따라 처리됩니다.
              </li>
              <li className={listItem}>
                <strong>Google Ads</strong>: 리마케팅 및 광고 성과 측정 목적.
              </li>
              <li className={listItem}>
                <strong>Facebook Pixel</strong>: 광고 성과 측정 및 맞춤 광고
                제공 목적.
              </li>
              <li className={listItem}>
                <strong>Naver Analytics</strong>: 네이버 검색 광고 성과 측정
                목적.
              </li>
            </ul>
          </Article>

          {/* 제5조 */}
          <Article title="제5조 (쿠키의 설치·운영 및 거부)">
            <p className={paragraph}>
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저의
              옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다
              확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  브라우저별 쿠키 설정 방법
                </h4>
                <ul className="mt-2 list-inside list-disc space-y-1.5">
                  <li className={listItem}>
                    <strong>Chrome</strong>: 설정 &gt; 개인정보 보호 및 보안
                    &gt; 쿠키 및 기타 사이트 데이터
                  </li>
                  <li className={listItem}>
                    <strong>Safari</strong>: 환경설정 &gt; 개인정보 보호 &gt;
                    쿠키 및 웹사이트 데이터
                  </li>
                  <li className={listItem}>
                    <strong>Firefox</strong>: 설정 &gt; 개인 정보 및 보안 &gt;
                    쿠키 및 사이트 데이터
                  </li>
                  <li className={listItem}>
                    <strong>Edge</strong>: 설정 &gt; 쿠키 및 사이트 권한 &gt;
                    쿠키 및 사이트 데이터
                  </li>
                </ul>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/50 dark:bg-amber-900/20">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  쿠키 설치를 거부할 경우 서비스 이용에 어려움이 발생할 수
                  있습니다.
                </p>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                  로그인이 필요한 서비스, 맞춤 추천 서비스 등 일부 서비스의
                  이용이 제한될 수 있습니다.
                </p>
              </div>
            </div>
          </Article>

          {/* 제6조 */}
          <Article title="제6조 (쿠키 정보의 보유 및 파기)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                세션 쿠키: 브라우저 종료 시 자동으로 삭제됩니다.
              </li>
              <li className={listItem}>
                지속 쿠키: 각 쿠키에 설정된 보유 기간이 경과하면 자동으로
                삭제됩니다.
              </li>
              <li className={listItem}>
                이용자가 직접 브라우저 설정을 통해 언제든지 쿠키를 삭제할 수
                있습니다.
              </li>
            </ol>
          </Article>

          {/* 제7조 */}
          <Article title="제7조 (정책 변경)">
            <p className={paragraph}>
              본 쿠키정책은 법률이나 서비스의 변경사항을 반영하기 위한 목적
              등으로 변경될 수 있습니다. 쿠키정책이 변경되는 경우 회사는
              변경사항을 사이트를 통해 게시하며, 변경된 쿠키정책은 게시한
              날로부터 효력이 발생합니다.
            </p>
          </Article>

          {/* 제8조 */}
          <Article title="제8조 (문의)">
            <p className={paragraph}>
              쿠키 사용에 관한 문의사항이 있으시면 아래로 연락해주세요.
            </p>
            <div className="mt-4 border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <InfoRow label="이메일" value="privacy@hsheavy.co.kr" />
                <InfoRow label="전화" value="070-7737-5000" />
                <InfoRow label="문의 페이지" value="문의하기" href="/contact" />
              </div>
            </div>
          </Article>
        </div>
      </div>

      {/* Related Links */}
      <section className="border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-800/50">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          관련 정책
        </h3>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Link
            href="/privacy"
            className="cursor-pointer text-sm font-medium text-primary underline transition hover:opacity-80"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="cursor-pointer text-sm font-medium text-primary underline transition hover:opacity-80"
          >
            이용약관
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Sub-Components ─────────────────────────────────
function Article({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-5">
      <h2 className={sectionTitle}>{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-28 flex-shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      {href ? (
        <Link
          href={href}
          className="cursor-pointer text-sm font-medium text-primary underline"
        >
          {value}
        </Link>
      ) : (
        <span className="text-sm text-neutral-900 dark:text-neutral-100">
          {value}
        </span>
      )}
    </div>
  );
}
