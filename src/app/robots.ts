import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * 답변엔진(AI) 크롤러를 명시적으로 허용한다.
 *
 * User-Agent: * 의 Allow 로도 이미 허용되지만, 명시 규칙을 두는 이유는 두 가지다.
 *  1) 의도를 문서로 남긴다 — 나중에 CDN·호스팅이 AI 봇을 기본 차단으로 바꾸면 근거가 된다.
 *  2) Google-Extended·Applebot-Extended 처럼 별도 opt-in 성격의 토큰은 명시해야 의미가 있다.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI 학습
  "OAI-SearchBot", // ChatGPT 검색 색인
  "ChatGPT-User", // 사용자 질문 시 실시간 조회
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot", // Common Crawl — 다수 모델의 학습 원천
  "Bingbot", // Copilot
  "NaverBot", // 네이버 검색·큐(Cue:)
  "Yeti", // 네이버 대표 크롤러
];

export default function robots(): MetadataRoute.Robots {
  // 관리자 화면은 어떤 봇에게도 색인 대상이 아니다.
  const disallow = ["/admin", "/admin/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
