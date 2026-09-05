import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 하루 한 번만 갱신(본문 페이지의 revalidate=10 과 달리 자주 바뀔 이유가 없다).
export const revalidate = 86400;

// next.config 의 trailingSlash: true 와 맞춘다. 색인 주소가 갈리면 안 된다.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/profile/", priority: 0.8 },
  { path: "/research/", priority: 0.8 },
  { path: "/insights/", priority: 0.8 },
  { path: "/cv/", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
