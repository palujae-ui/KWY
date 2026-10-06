import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";
import { extraColumns, instituteEssays } from "@/data/insights";
import { getColumns } from "@/lib/content";

/**
 * /rss.xml — 네이버 서치어드바이저 「RSS 제출」·피드 리더용.
 *
 * 항목 = 사이트 주요 페이지 + 기고(내일신문·서울경제·하나금융연구소).
 * 네이버 RSS 검사는 <link>가 등록 도메인(kwyoo.co)이어야 통과한다. 그래서 기고 항목의
 * link는 /insights/(목록 페이지)로 두고, 언론사 원문 주소는 guid(isPermaLink=false)와
 * 본문에 남긴다.
 * 칼럼 병합 규칙은 /insights 페이지와 같다(DB 우선, URL 중복 제거).
 */
export const revalidate = 86400;

const pages = [
  { path: "/", title: `${profile.nameKo} 교수 홈`, desc: profile.tagline },
  { path: "/profile/", title: "프로필", desc: `${profile.affiliation} ${profile.title} 약력` },
  { path: "/research/", title: "연구", desc: "학술 논문·보고서 목록" },
  { path: "/insights/", title: "정책·기고", desc: "정책 자문 활동과 연재 칼럼, 언론 인용" },
  { path: "/cv/", title: "CV", desc: "이력서" },
];

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "YYYY.MM.DD" → RFC 822 (KST 09:00) */
function rfc822(date: string) {
  const [y, m, d] = date.split(".").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1, 0)).toUTCString();
}

export async function GET() {
  const dbColumns = await getColumns();
  const seen = new Set(dbColumns.map((c) => c.url).filter(Boolean));
  const writings = [
    ...dbColumns,
    ...extraColumns.filter((c) => !seen.has(c.url)),
    ...instituteEssays,
  ]
    .filter((c) => c.url)
    .sort((a, b) => b.date.localeCompare(a.date));

  const now = new Date().toUTCString();
  const latest = writings[0] ? rfc822(writings[0].date) : now;

  const pageItems = pages.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}${p.path}</link>
      <guid isPermaLink="true">${SITE_URL}${p.path}</guid>
      <description>${esc(p.desc)}</description>
      <pubDate>${latest}</pubDate>
    </item>`
  );

  const writingItems = writings.map(
    (c) => `    <item>
      <title>${esc(c.title)}</title>
      <link>${SITE_URL}/insights/</link>
      <guid isPermaLink="false">${esc(c.url!)}</guid>
      <description>${esc(`${c.outlet} · ${profile.nameKo} ${profile.affiliation} ${profile.title} · 원문 ${c.url}`)}</description>
      <category>${esc(c.outlet)}</category>
      <pubDate>${rfc822(c.date)}</pubDate>
    </item>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${profile.nameKo} | ${profile.affiliation}`)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(profile.tagline)}</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
${[...pageItems, ...writingItems].join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
