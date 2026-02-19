import Link from "next/link";

// ─── Shared Styles ──────────────────────────────────
const sectionTitle =
  "text-base font-bold text-neutral-900 dark:text-neutral-100";
const paragraph =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";
const listItem =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";

// ─── Component ──────────────────────────────────────
export function PrivacyContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl dark:text-neutral-100">
          개인정보처리방침
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          시행일자: 2024년 1월 1일 | 최종 수정일: 2024년 12월 1일
        </p>
      </section>

      <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <p className={paragraph}>
            중기나라 (주) (이하 &quot;회사&quot;)는 「개인정보 보호법」 제30조에
            따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고
            원활하게 처리할 수 있도록 하기 위하여 다음과 같이
            개인정보처리방침을 수립·공개합니다.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {/* 제1조 */}
          <Article title="제1조 (개인정보의 처리 목적)">
            <p className={paragraph}>
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
              목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li className={listItem}>
                <strong>회원가입 및 관리</strong>: 회원 가입의사 확인, 회원제
                서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스
                부정이용 방지, 각종 고지·통지, 고충처리
              </li>
              <li className={listItem}>
                <strong>서비스 제공</strong>: 건설장비 매물 등록·조회, 업체
                등록·검색, 구인·구직 서비스, 게시판 서비스, 주요양식 제공,
                콘텐츠 제공, 맞춤서비스 제공
              </li>
              <li className={listItem}>
                <strong>고충처리</strong>: 민원인의 신원 확인, 민원사항 확인,
                사실조사를 위한 연락·통지, 처리결과 통보
              </li>
              <li className={listItem}>
                <strong>마케팅 및 광고 활용</strong>: 신규 서비스 개발 및
                맞춤서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공,
                인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의
                유효성 확인, 접속빈도 파악, 회원의 서비스 이용에 대한 통계
              </li>
            </ol>
          </Article>

          {/* 제2조 */}
          <Article title="제2조 (개인정보의 처리 및 보유 기간)">
            <p className={paragraph}>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      수집 목적
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      보유 기간
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      근거 법령
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      회원가입 및 관리
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      회원 탈퇴 시까지
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      -
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      계약 또는 청약철회 등에 관한 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      5년
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      전자상거래법
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      대금결제 및 재화 등의 공급에 관한 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      5년
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      전자상거래법
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      소비자 불만 또는 분쟁처리에 관한 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      3년
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      전자상거래법
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      표시·광고에 관한 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      6개월
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      전자상거래법
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      웹사이트 방문 기록
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      3개월
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      통신비밀보호법
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Article>

          {/* 제3조 */}
          <Article title="제3조 (처리하는 개인정보의 항목)">
            <p className={paragraph}>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <div className="mt-3 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  1. 필수항목
                </h4>
                <ul className="mt-1.5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    회원가입: 이름, 이메일, 비밀번호, 휴대전화번호
                  </li>
                  <li className={listItem}>
                    매물등록: 이름, 연락처, 사업자등록번호(업체의 경우)
                  </li>
                  <li className={listItem}>
                    업체등록: 업체명, 대표자명, 사업자등록번호, 연락처, 주소
                  </li>
                  <li className={listItem}>
                    구인/구직: 이름, 연락처, 이메일
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  2. 선택항목
                </h4>
                <ul className="mt-1.5 list-inside list-disc space-y-1">
                  <li className={listItem}>프로필 사진, 자기소개, 관심 장비 카테고리</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  3. 자동 수집 항목
                </h4>
                <ul className="mt-1.5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    IP주소, 쿠키, MAC주소, 서비스 이용 기록, 방문 기록, 불량
                    이용 기록, 브라우저 종류 및 OS, 접속 일시
                  </li>
                </ul>
              </div>
            </div>
          </Article>

          {/* 제4조 */}
          <Article title="제4조 (개인정보의 제3자 제공)">
            <p className={paragraph}>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서
              명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한
              규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만
              개인정보를 제3자에게 제공합니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      제공받는 자
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      제공 목적
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      제공 항목
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      보유 기간
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-4 text-center text-neutral-500 dark:text-neutral-400"
                    >
                      현재 개인정보를 제3자에게 제공하고 있지 않습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Article>

          {/* 제5조 */}
          <Article title="제5조 (개인정보처리의 위탁)">
            <p className={paragraph}>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      수탁업체
                    </th>
                    <th className="px-3 py-2.5 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                      위탁업무 내용
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      AWS (Amazon Web Services)
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      데이터 보관 및 인프라 관리
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      NHN클라우드
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 dark:text-neutral-400">
                      SMS/알림톡 발송
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={`mt-3 ${paragraph}`}>
              위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무
              수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁
              제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을
              계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
              처리하는지를 감독하고 있습니다.
            </p>
          </Article>

          {/* 제6조 */}
          <Article title="제6조 (개인정보의 파기절차 및 파기방법)">
            <p className={paragraph}>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  1. 파기절차
                </h4>
                <p className={`mt-1 ${paragraph}`}>
                  이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의
                  경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간
                  저장된 후 혹은 즉시 파기됩니다.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  2. 파기방법
                </h4>
                <ul className="mt-1.5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                    방법을 사용합니다.
                  </li>
                  <li className={listItem}>
                    종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                    파기합니다.
                  </li>
                </ul>
              </div>
            </div>
          </Article>

          {/* 제7조 */}
          <Article title="제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)">
            <p className={paragraph}>
              정보주체는 회사에 대해 언제든지 개인정보 보호 관련 권리를 행사할
              수 있습니다.
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li className={listItem}>개인정보 열람 요구</li>
              <li className={listItem}>오류 등이 있을 경우 정정 요구</li>
              <li className={listItem}>삭제 요구</li>
              <li className={listItem}>처리정지 요구</li>
            </ol>
            <p className={`mt-3 ${paragraph}`}>
              위 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조
              제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수
              있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
            <p className={`mt-2 ${paragraph}`}>
              정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
              경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
              이용하거나 제공하지 않습니다.
            </p>
          </Article>

          {/* 제8조 */}
          <Article title="제8조 (개인정보의 안전성 확보조치)">
            <p className={paragraph}>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-2">
              <li className={listItem}>
                <strong>관리적 조치</strong>: 내부관리계획 수립·시행, 개인정보
                취급 직원의 최소화 및 교육
              </li>
              <li className={listItem}>
                <strong>기술적 조치</strong>: 개인정보처리시스템 등의 접근권한
                관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                보안프로그램 설치
              </li>
              <li className={listItem}>
                <strong>물리적 조치</strong>: 전산실, 자료보관실 등의 접근통제
              </li>
            </ol>
          </Article>

          {/* 제9조 */}
          <Article title="제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)">
            <p className={paragraph}>
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
              저장하고 수시로 불러오는 &apos;쿠키(cookie)&apos;를 사용합니다.
              쿠키에 관한 자세한 사항은{" "}
              <Link
                href="/cookies"
                className="cursor-pointer font-medium text-primary underline"
              >
                쿠키정책
              </Link>
              을 참고해주세요.
            </p>
          </Article>

          {/* 제10조 */}
          <Article title="제10조 (개인정보 보호책임자)">
            <p className={paragraph}>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-4 border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <InfoRow label="직책" value="대표이사" />
                <InfoRow label="성명" value="홍길동" />
                <InfoRow label="연락처" value="1588-0000" />
                <InfoRow label="이메일" value="privacy@hsheavy.co.kr" />
              </div>
            </div>
          </Article>

          {/* 제11조 */}
          <Article title="제11조 (권익침해 구제방법)">
            <p className={paragraph}>
              정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보
              분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
              분쟁해결이나 상담 등을 신청할 수 있습니다.
            </p>
            <div className="mt-4 border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                <InfoRow
                  label="개인정보분쟁조정위원회"
                  value="(국번없이) 1833-6972 / www.kopico.go.kr"
                />
                <InfoRow
                  label="개인정보침해신고센터"
                  value="(국번없이) 118 / privacy.kisa.or.kr"
                />
                <InfoRow
                  label="대검찰청"
                  value="(국번없이) 1301 / www.spo.go.kr"
                />
                <InfoRow
                  label="경찰청"
                  value="(국번없이) 182 / ecrm.cyber.go.kr"
                />
              </div>
            </div>
          </Article>

          {/* 제12조 */}
          <Article title="제12조 (개인정보처리방침 변경)">
            <p className={paragraph}>
              이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다. 이전의
              개인정보처리방침은 아래에서 확인하실 수 있습니다.
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li className={listItem}>2024년 1월 1일 ~ 현재 적용 (현행)</li>
            </ul>
          </Article>
        </div>
      </div>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-44 flex-shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm text-neutral-900 dark:text-neutral-100">
        {value}
      </span>
    </div>
  );
}
