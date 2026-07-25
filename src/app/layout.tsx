import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "유경원 | 상명대학교 경제금융학부",
    template: "%s | 유경원",
  },
  description:
    "유경원(Kyeongwon Yoo) 상명대학교 경영경제대학 경제금융학부 교수. 가계부채·가계저축·인구고령화·서민금융 연구. KDI, 한국은행, 보험연구원을 거쳐 논문 55편 발표.",
  keywords: [
    "유경원",
    "Kyeongwon Yoo",
    "상명대학교",
    "경제금융학부",
    "가계부채",
    "가계저축",
    "서민금융",
    "신용평가",
  ],
  openGraph: {
    title: "유경원 | 상명대학교 경제금융학부",
    description:
      "가계부채·가계저축·인구고령화·서민금융 연구. 논문 55편. 금융위원회 신용평가체계 개편 T/F 위원.",
    type: "profile",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Roboto+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-700 font-sans selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
