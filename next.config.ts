import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 백엔드 없음 — 순수 정적 사이트. next build 시 out/ 에 HTML/CSS/JS 만 생성된다.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
