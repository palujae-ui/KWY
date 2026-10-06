/**
 * 사이트 정규 주소(canonical origin).
 * 커스텀 도메인을 붙이면 Vercel 환경변수 NEXT_PUBLIC_SITE_URL 만 바꾸면 된다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kwyoo.co"
).replace(/\/$/, "");

/**
 * 공통 Open Graph 값. 각 페이지는 `openGraph: { ...baseOpenGraph, url: "/경로/" }`로
 * og:url만 덧붙인다(Next 메타데이터는 openGraph를 통째로 덮어쓰므로 펼쳐서 쓴다).
 */
export const baseOpenGraph = {
  title: "유경원 | 상명대학교 경제금융학부",
  description:
    "가계부채·가계저축·인구고령화·서민금융 연구. 금융위원회 신용평가체계 개편 T/F 위원·새출발기금 심사위원장.",
  type: "profile" as const,
  locale: "ko_KR",
  siteName: "유경원 | 상명대학교 경제금융학부",
};
