import Link from "next/link";

// ─── Shared Styles ──────────────────────────────────
const sectionTitle =
  "text-base font-bold text-neutral-900 dark:text-neutral-100";
const paragraph =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";
const listItem =
  "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";

// ─── Component ──────────────────────────────────────
export function TermsContent() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl dark:text-neutral-100">
          이용약관
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          시행일자: 2026년 2월 20일 | 최종 수정일: 2026년 2월 20일
        </p>
      </section>

      <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {/* ═══ 제1장 총칙 ═══ */}
          <ChapterHeader title="제1장 총칙" />

          {/* 제1조 */}
          <Article title="제1조 (목적)">
            <p className={paragraph}>
              이 약관은 실마릴테크놀로지스 주식회사 (이하 &quot;회사&quot;)가
              운영하는 인터넷 사이트 &quot;중기나라&quot; (이하
              &quot;사이트&quot;)에서 제공하는 온라인 서비스(이하
              &quot;서비스&quot;)를 이용함에 있어 회사와 이용자의 권리·의무 및
              책임사항을 규정함을 목적으로 합니다.
            </p>
          </Article>

          {/* 제2조 */}
          <Article title="제2조 (정의)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                <strong>&quot;사이트&quot;</strong>란 회사가 건설장비 매매 정보,
                업체 정보, 구인·구직 정보 등 서비스를 이용자에게 제공하기 위하여
                컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장을
                말합니다.
              </li>
              <li className={listItem}>
                <strong>&quot;이용자&quot;</strong>란 사이트에 접속하여 이
                약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
              </li>
              <li className={listItem}>
                <strong>&quot;회원&quot;</strong>이란 회사에 개인정보를 제공하여
                회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며,
                회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
                말합니다.
              </li>
              <li className={listItem}>
                <strong>&quot;비회원&quot;</strong>이란 회원에 가입하지 않고
                회사가 제공하는 서비스를 이용하는 자를 말합니다.
              </li>
              <li className={listItem}>
                <strong>&quot;매물&quot;</strong>이란 회원이 사이트에 등록하는
                건설장비, 중장비 등의 매매 대상물을 말합니다.
              </li>
              <li className={listItem}>
                <strong>&quot;게시물&quot;</strong>이란 이용자가 서비스를
                이용함에 있어 사이트에 게시한 부호·문자·음성·음향·화상·동영상
                등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을
                말합니다.
              </li>
            </ol>
          </Article>

          {/* 제3조 */}
          <Article title="제3조 (약관의 게시와 개정)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기
                화면에 게시합니다.
              </li>
              <li className={listItem}>
                회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및
                정보보호 등에 관한 법률(이하 &quot;정보통신망법&quot;)」 등
                관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
              </li>
              <li className={listItem}>
                회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                현행약관과 함께 사이트의 초기화면에 그 적용일자 7일 이전부터
                적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관
                내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고
                공지합니다.
              </li>
              <li className={listItem}>
                회원이 개정약관의 적용에 동의하지 않는 경우 회원은 이용계약을
                해지(회원탈퇴)할 수 있습니다.
              </li>
            </ol>
          </Article>

          {/* 제4조 */}
          <Article title="제4조 (약관 외 준칙)">
            <p className={paragraph}>
              이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
              「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에
              관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등
              관련 법령에 따릅니다.
            </p>
          </Article>

          {/* ═══ 제2장 회원가입 ═══ */}
          <ChapterHeader title="제2장 회원가입 및 서비스 이용" />

          {/* 제5조 */}
          <Article title="제5조 (이용계약의 체결)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                이용계약은 회원이 되고자 하는 자(이하 &quot;가입신청자&quot;)가
                약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가
                이러한 신청에 대하여 승낙함으로써 체결됩니다.
              </li>
              <li className={listItem}>
                회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을
                원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에
                대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수
                있습니다.
                <ul className="mt-1.5 ml-5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이
                    있는 경우
                  </li>
                  <li className={listItem}>
                    실명이 아니거나 타인의 명의를 이용한 경우
                  </li>
                  <li className={listItem}>
                    허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지
                    않은 경우
                  </li>
                  <li className={listItem}>
                    14세 미만 아동이 법정대리인의 동의를 얻지 아니한 경우
                  </li>
                  <li className={listItem}>
                    이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한
                    제반 사항을 위반하며 신청하는 경우
                  </li>
                </ul>
              </li>
            </ol>
          </Article>

          {/* 제6조 */}
          <Article title="제6조 (회원정보의 변경)">
            <p className={paragraph}>
              회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를
              열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한
              아이디(ID)는 수정이 불가능합니다. 회원은 회원가입신청 시 기재한
              사항이 변경되었을 경우 온라인으로 수정하거나 전자우편 기타
              방법으로 회사에 대하여 그 변경사항을 알려야 합니다.
            </p>
          </Article>

          {/* 제7조 */}
          <Article title="제7조 (회원 탈퇴 및 자격 상실)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시
                회원탈퇴를 처리합니다.
              </li>
              <li className={listItem}>
                회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한
                및 정지시킬 수 있습니다.
                <ul className="mt-1.5 ml-5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    가입 신청 시에 허위 내용을 등록한 경우
                  </li>
                  <li className={listItem}>
                    다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등
                    전자상거래 질서를 위협하는 경우
                  </li>
                  <li className={listItem}>
                    서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에
                    반하는 행위를 하는 경우
                  </li>
                  <li className={listItem}>
                    허위 매물을 등록하거나 사기 등 부정한 목적으로 서비스를
                    이용하는 경우
                  </li>
                </ul>
              </li>
            </ol>
          </Article>

          {/* ═══ 제3장 서비스 이용 ═══ */}
          <ChapterHeader title="제3장 서비스 이용" />

          {/* 제8조 */}
          <Article title="제8조 (서비스의 제공 및 변경)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 다음과 같은 서비스를 제공합니다.
                <ul className="mt-1.5 ml-5 list-inside list-disc space-y-1">
                  <li className={listItem}>
                    건설장비 매물 등록 및 조회 서비스
                  </li>
                  <li className={listItem}>업체 등록 및 검색 서비스</li>
                  <li className={listItem}>구인·구직 정보 제공 서비스</li>
                  <li className={listItem}>
                    게시판(자유게시판, 매매게시판 등) 서비스
                  </li>
                  <li className={listItem}>주요양식 제공 서비스</li>
                  <li className={listItem}>VIP 프리미엄 매물 서비스</li>
                  <li className={listItem}>
                    기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스
                  </li>
                </ul>
              </li>
              <li className={listItem}>
                회사는 서비스의 내용을 변경하는 경우 그 변경사항을 이용자에게
                공지합니다.
              </li>
            </ol>
          </Article>

          {/* 제9조 */}
          <Article title="제9조 (서비스의 중단)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의
                두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로
                중단할 수 있습니다.
              </li>
              <li className={listItem}>
                회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로
                인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단,
                회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
                아니합니다.
              </li>
              <li className={listItem}>
                사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로
                서비스를 제공할 수 없게 되는 경우에는 회사는 제3조에서 정한
                방법으로 이용자에게 통지합니다.
              </li>
            </ol>
          </Article>

          {/* 제10조 */}
          <Article title="제10조 (게시물의 관리)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회원의 게시물이 「정보통신망법」 및 「저작권법」 등 관련 법에
                위반되는 내용을 포함하는 경우, 권리자는 관련 법이 정한 절차에
                따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며,
                회사는 관련 법에 따라 조치를 취하여야 합니다.
              </li>
              <li className={listItem}>
                회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가
                인정될 만한 사유가 있거나 기타 회사 정책 및 관련 법에 위반되는
                경우에는 관련 법에 따라 해당 게시물에 대해 임시조치 등을 취할 수
                있습니다.
              </li>
              <li className={listItem}>
                다음 각 호에 해당하는 게시물은 사전 통지 없이 삭제될 수
                있습니다.
                <ul className="mt-1.5 ml-5 list-inside list-disc space-y-1">
                  <li className={listItem}>허위 매물 또는 사기성 게시물</li>
                  <li className={listItem}>
                    타인의 명예를 훼손하거나 불이익을 주는 게시물
                  </li>
                  <li className={listItem}>
                    음란물 또는 공서양속에 반하는 게시물
                  </li>
                  <li className={listItem}>
                    영리 목적의 광고성 게시물 (허가되지 않은 경우)
                  </li>
                  <li className={listItem}>
                    범죄와 관련이 있다고 판단되는 게시물
                  </li>
                  <li className={listItem}>기타 관련 법령에 위반되는 게시물</li>
                </ul>
              </li>
            </ol>
          </Article>

          {/* ═══ 제4장 의무 ═══ */}
          <ChapterHeader title="제4장 의무 및 책임" />

          {/* 제11조 */}
          <Article title="제11조 (회사의 의무)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
                않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로
                서비스를 제공하는 데 최선을 다하여야 합니다.
              </li>
              <li className={listItem}>
                회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록
                이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을
                갖추어야 합니다.
              </li>
              <li className={listItem}>
                회사는 이용자가 원하지 않는 영리목적의 광고성 전자우편을
                발송하지 않습니다.
              </li>
            </ol>
          </Article>

          {/* 제12조 */}
          <Article title="제12조 (이용자의 의무)">
            <p className={paragraph}>
              이용자는 다음 행위를 하여서는 안 됩니다.
            </p>
            <ol className="mt-2 list-inside list-decimal space-y-2">
              <li className={listItem}>신청 또는 변경 시 허위 내용의 등록</li>
              <li className={listItem}>타인의 정보 도용</li>
              <li className={listItem}>회사가 게시한 정보의 변경</li>
              <li className={listItem}>
                회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는
                게시
              </li>
              <li className={listItem}>
                회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
              </li>
              <li className={listItem}>
                회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
              </li>
              <li className={listItem}>
                외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
                정보를 사이트에 공개 또는 게시하는 행위
              </li>
              <li className={listItem}>
                허위 매물 등록 또는 사기 목적의 서비스 이용
              </li>
              <li className={listItem}>
                회사의 동의 없이 영리를 목적으로 서비스를 이용하는 행위
              </li>
              <li className={listItem}>기타 불법적이거나 부당한 행위</li>
            </ol>
          </Article>

          {/* 제13조 */}
          <Article title="제13조 (매물 등록 및 거래에 관한 책임)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 매물 등록 서비스를 통해 매매 당사자 간의 거래를 중개하는
                플랫폼을 제공하며, 거래 당사자가 아닙니다.
              </li>
              <li className={listItem}>
                매물의 정보(가격, 상태, 사양 등)에 대한 책임은 해당 매물을
                등록한 회원에게 있습니다.
              </li>
              <li className={listItem}>
                회사는 매매 당사자 간에 성립한 거래에 대해서는 책임을 지지
                않습니다. 다만, 허위 매물 등 부정한 거래를 방지하기 위한 합리적
                노력을 기울입니다.
              </li>
              <li className={listItem}>
                회원은 매물 등록 시 정확한 정보를 기재하여야 하며, 허위 또는
                과장된 정보를 기재하여서는 안 됩니다.
              </li>
            </ol>
          </Article>

          {/* ═══ 제5장 기타 ═══ */}
          <ChapterHeader title="제5장 기타" />

          {/* 제14조 */}
          <Article title="제14조 (저작권의 귀속 및 이용제한)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에
                귀속합니다.
              </li>
              <li className={listItem}>
                이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게
                지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신,
                출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
                제3자에게 이용하게 하여서는 안 됩니다.
              </li>
              <li className={listItem}>
                이용자가 서비스 내에 게시한 게시물의 저작권은 해당 게시물의
                저작자에게 귀속됩니다. 다만, 이용자는 서비스를 통해 게시물을
                게시하는 것으로 회사에게 해당 게시물을 서비스 내에서 이용할 수
                있는 비독점적 라이선스를 부여한 것으로 봅니다.
              </li>
            </ol>
          </Article>

          {/* 제15조 */}
          <Article title="제15조 (개인정보보호)">
            <p className={paragraph}>
              회사는 이용자의 개인정보를 보호하기 위해 「개인정보 보호법」 등
              관련 법령이 정하는 바를 준수합니다. 개인정보의 보호 및 사용에
              대해서는{" "}
              <Link
                href="/privacy"
                className="cursor-pointer font-medium text-primary underline"
              >
                개인정보처리방침
              </Link>
              에 따릅니다.
            </p>
          </Article>

          {/* 제16조 */}
          <Article title="제16조 (분쟁해결)">
            <ol className="list-inside list-decimal space-y-2">
              <li className={listItem}>
                회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그
                피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
              </li>
              <li className={listItem}>
                회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소
                당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를
                관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의
                주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는
                민사소송법상의 관할법원에 제기합니다.
              </li>
              <li className={listItem}>
                회사와 이용자 간에 발생한 분쟁에 관해서는 대한민국 법을
                적용합니다.
              </li>
            </ol>
          </Article>

          {/* 부칙 */}
          <Article title="부칙">
            <p className={paragraph}>
              이 약관은 2026년 2월 20일부터 시행합니다.
            </p>
          </Article>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Components ─────────────────────────────────
function ChapterHeader({ title }: { title: string }) {
  return (
    <div className="bg-neutral-50 px-5 py-3 dark:bg-neutral-800/50">
      <h2 className="text-sm font-bold text-primary">{title}</h2>
    </div>
  );
}

function Article({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-5">
      <h3 className={sectionTitle}>{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
