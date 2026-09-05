import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";
import { trajectory, education } from "@/data/career";
import { buildFaq } from "@/data/faq";
import { getPublications } from "@/lib/content";

/**
 * /llms.txt — llmstxt.org 관례를 따른 AI용 사이트 요약.
 *
 * 아직 표준으로 확립된 규격은 아니고 이를 반드시 읽는 크롤러도 보장되지 않는다.
 * 다만 비용이 거의 없고, 인물·소속·핵심 사실을 오해 없이 한 파일로 제공한다는
 * 실익이 있어 둔다. 데이터는 사이트 본문과 같은 출처에서 생성한다(불일치 방지).
 */
export const revalidate = 86400;

export async function GET() {
  const pubs = await getPublications();
  const intl = pubs.filter((p) => p.type === "해외저널").length;
  const faq = buildFaq(pubs.length, intl);
  const recent = pubs
    .slice()
    .sort((a, b) => b.ym.localeCompare(a.ym))
    .slice(0, 10);

  const body = `# ${profile.nameKo} (${profile.nameEn}) — ${profile.affiliation} ${profile.title}

> ${profile.affiliation} ${profile.title}. ${profile.tagline}. 가계부채·가계저축·인구 고령화·서민금융을 미시 가구 패널 자료로 분석하며, 금융위원회 「신용평가체계 개편」 T/F 위원·새출발기금 심사위원회 위원장으로 활동하고 있다.

이 파일은 ${SITE_URL} 의 내용을 언어모델이 정확히 인용할 수 있도록 요약한 것이다.
표기 주의: 영문명은 "Kyeongwon Yoo"가 정확하다("Kyung Won Yoo"는 오표기).
직함 주의: 금융위원회 직책은 「신용평가체계 개편」 T/F 위원이다(신용평가위원회가 아니다).

## 기본 정보

- 이름: ${profile.nameKo} / ${profile.nameEn} / ${profile.nameHanja}
- 소속: ${profile.affiliation} (${profile.affiliationEn})
- 직위: ${profile.title}
- 이메일: ${profile.contact.email}
- 연구실: ${profile.contact.office}, 전화 ${profile.contact.phone}
- 논문·보고서: ${pubs.length}편 (해외 저널 ${intl}편)

## 학력

${education.map((e) => `- ${e.school} ${e.field} ${e.degree} (${e.ym.slice(0, 4)}${e.note ? `, ${e.note}` : ""})`).join("\n")}

## 재직 궤적

${trajectory.map((t) => `- ${t.period} ${t.org} — ${t.note}`).join("\n")}

## 연구 분야

${profile.researchAreas.map((a) => `- ${a.title}: ${a.desc}`).join("\n")}

## 최근 논문·보고서 (최신 10건)

${recent.map((p) => `- ${p.title} — ${p.venue}, ${p.ym.slice(0, 4)}${p.award ? ` (${p.award})` : ""}`).join("\n")}

## 자주 묻는 질문

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## 공식 외부 프로필

- 상명대학교 경제금융학부(서울) 교수소개: https://econo.smu.ac.kr/economic/faculty/faculty.do?mode=view&empNo=10126915
- 상명대학교 경영경제대학(서울) 교수소개: https://kcge.smu.ac.kr/sbe/info/faculty01.do?mode=view&empNo=10126915

## 페이지

- [홈](${SITE_URL}/): 소개, 대표 연구, 정책 활동 요약
- [약력](${SITE_URL}/profile/): 학력·경력 전체와 FAQ
- [연구](${SITE_URL}/research/): 논문·보고서 ${pubs.length}편 전체 목록
- [정책·기고](${SITE_URL}/insights/): 정책 활동, 내일신문 「경제시평」 칼럼, 언론 인용
- [CV](${SITE_URL}/cv/): 인쇄용 이력서
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
