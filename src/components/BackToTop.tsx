"use client";

import { useEffect, useState } from "react";

/**
 * 맨 위로 버튼.
 * 연구 페이지는 논문 55편이 세로로 쌓여 모바일에서 20,000px를 넘어가므로
 * 스크롤 복귀 수단이 필요하다. 데스크톱에서도 동일하게 동작한다.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={`no-print fixed z-40 right-4 bottom-4 md:right-8 md:bottom-8 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all duration-200 hover:bg-blue-700 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
