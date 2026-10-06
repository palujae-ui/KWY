import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 2: 정적 export를 끄고 서버 렌더링 앱으로 전환(Vercel 배포).
  // 관리자(admin) 로그인·저장 기능과 Supabase 연동을 위해 서버가 필요하다.
  images: { unoptimized: true },
  trailingSlash: true,
  // 구 Vercel 기본 주소로 들어오면 정식 도메인으로 301 이동(중복 색인 방지).
  // 미리보기(preview) 배포 주소는 건드리지 않도록 호스트를 정확히 지정한다.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kwy-one.vercel.app" }],
        destination: "https://kwyoo.co/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
