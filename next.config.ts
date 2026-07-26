import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 2: 정적 export를 끄고 서버 렌더링 앱으로 전환(Vercel 배포).
  // 관리자(admin) 로그인·저장 기능과 Supabase 연동을 위해 서버가 필요하다.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
