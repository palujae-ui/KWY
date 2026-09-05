/**
 * 사이트 정규 주소(canonical origin).
 * 커스텀 도메인을 붙이면 Vercel 환경변수 NEXT_PUBLIC_SITE_URL 만 바꾸면 된다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kwy-one.vercel.app"
).replace(/\/$/, "");
