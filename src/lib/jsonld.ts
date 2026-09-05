/**
 * schema.org 구조화 데이터 빌더.
 *
 * ⚠️ 원칙: 여기 들어가는 사실은 전부 src/data 의 검증된 값에서만 파생한다.
 *    확인되지 않은 식별자(ORCID·Google Scholar 등)는 넣지 않는다 — AI가 잘못된
 *    동명이인 정보를 붙이는 원인이 된다.
 */
import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";
import { education, career } from "@/data/career";
import { publications, type Publication } from "@/data/publications";

/** 사이트 전체에서 이 URI 하나로 인물을 가리킨다(엔티티 통합). */
export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

/**
 * 확인된 외부 신원 링크(sameAs).
 * 두 곳 모두 상명대 공식 페이지이며 같은 교번(empNo=10126915)을 가리킨다.
 * 목록 페이징 파라미터(pager.offset 등)는 신원과 무관하므로 제거했다.
 */
export const FACULTY_PAGE =
  "https://econo.smu.ac.kr/economic/faculty/faculty.do?mode=view&empNo=10126915";

const SAME_AS = [
  FACULTY_PAGE, // 경제금융학부(서울) 교수소개
  "https://kcge.smu.ac.kr/sbe/info/faculty01.do?mode=view&empNo=10126915", // 경영경제대학(서울) 교수소개
];

/** "2010.09" → "2010-09" (schema.org 는 ISO 8601 을 기대한다) */
function toIsoMonth(ym: string): string {
  return ym.replace(".", "-");
}

const DEGREE_EN: Record<string, string> = {
  박사: "PhD",
  석사: "MA",
  학사: "BA",
};

export function personSchema() {
  const current = career.filter((c) => c.to === null);
  const awards = Array.from(
    new Set(publications.filter((p) => p.award).map((p) => p.award as string))
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.nameKo,
    alternateName: [profile.nameEn, profile.nameHanja],
    givenName: "경원",
    familyName: "유",
    jobTitle: profile.title,
    description: profile.intro[0],
    url: `${SITE_URL}/`,
    mainEntityOfPage: `${SITE_URL}/profile/`,
    image: `${SITE_URL}/portrait-720.jpg`,
    email: `mailto:${profile.contact.email}`,
    telephone: profile.contact.phone,
    worksFor: { "@id": ORG_ID },
    affiliation: { "@id": ORG_ID },
    workLocation: {
      "@type": "Place",
      name: profile.contact.office,
      address: {
        "@type": "PostalAddress",
        addressLocality: "서울",
        addressCountry: "KR",
      },
    },
    // 서강대 석사·학사처럼 같은 학교가 두 번 나오므로 중복 제거
    alumniOf: Array.from(new Set(education.map((e) => e.school))).map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
    hasCredential: education.map((e) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: DEGREE_EN[e.degree] ?? e.degree,
      about: e.field,
      recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
    })),
    knowsAbout: profile.researchAreas.map((a) => a.title),
    knowsLanguage: ["ko", "en"],
    hasOccupation: {
      "@type": "Occupation",
      name: "경제학 교수",
      occupationalCategory: "Postsecondary Economics Teacher",
    },
    // 현직 위원·임원직 — "지금 무슨 일을 하는 사람인가"에 대한 답의 근거.
    // schema.org 권장 형태는 OrganizationRole 로 기간을 감싸는 것이다.
    memberOf: current.map((c) => ({
      "@type": "OrganizationRole",
      roleName: c.role,
      startDate: toIsoMonth(c.from),
      memberOf: { "@type": "Organization", name: c.org },
    })),
    award: awards,
    sameAs: SAME_AS,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": ORG_ID,
    name: "상명대학교",
    alternateName: "Sangmyung University",
    department: {
      "@type": "Organization",
      name: profile.affiliation,
      alternateName: profile.affiliationEn,
    },
    url: "https://www.smu.ac.kr/",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/`,
    name: `${profile.nameKo} | ${profile.affiliation}`,
    inLanguage: "ko-KR",
    about: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** 논문 1건 → ScholarlyArticle. ym 은 YYYYMM 또는 YYYY. */
function articleSchema(p: Publication) {
  const year = p.ym.slice(0, 4);
  const month = p.ym.length >= 6 ? p.ym.slice(4, 6) : null;
  return {
    "@type": p.type === "저서" ? "Book" : "ScholarlyArticle",
    name: p.title,
    headline: p.title,
    datePublished: month ? `${year}-${month}` : year,
    author: { "@id": PERSON_ID },
    isPartOf: { "@type": "Periodical", name: p.venue },
    about: p.topics,
    inLanguage: p.type === "해외저널" ? "en" : "ko-KR",
    ...(p.award ? { award: p.award } : {}),
  };
}

export function researchListSchema(pubs: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/research/#collection`,
    url: `${SITE_URL}/research/`,
    name: `${profile.nameKo} 논문·보고서`,
    about: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: pubs.length,
      itemListElement: pubs.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: articleSchema(p),
      })),
    },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/profile/#page`,
    url: `${SITE_URL}/profile/`,
    name: `${profile.nameKo} 약력`,
    mainEntity: { "@id": PERSON_ID },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/**
 * 정책·기고 페이지 — 연재 칼럼을 원문 URL과 함께 노출한다.
 * 칼럼 본문은 언론사 사이트에 있으므로 url 로 1차 출처를 가리키고 저자만 명시한다.
 */
export function insightsSchema(
  columns: { title: string; outlet: string; date: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/insights/#collection`,
    url: `${SITE_URL}/insights/`,
    name: `${profile.nameKo} 정책 활동·기고`,
    about: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      name: "기고 칼럼",
      numberOfItems: columns.length,
      itemListElement: columns.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "OpinionNewsArticle",
          headline: c.title,
          datePublished: c.date.replace(/\./g, "-"),
          author: { "@id": PERSON_ID },
          publisher: { "@type": "NewsMediaOrganization", name: c.outlet },
          inLanguage: "ko-KR",
          ...(c.url ? { url: c.url, mainEntityOfPage: c.url } : {}),
        },
      })),
    },
  };
}
