import Link from "next/link";
import LogoutButton from "./LogoutButton";

/**
 * 관리자 공용 디자인 요소.
 * 공개 사이트와 같은 결(블루/슬레이트, 부드러운 라운드·그림자)을 관리자에도 통일 적용.
 */

export const ui = {
  input:
    "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
  label: "block text-[13px] font-semibold text-slate-700 mb-1.5",
  hint: "text-[11px] text-slate-400 mt-1",
  btn: "inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm shadow-blue-600/25 transition hover:bg-blue-700 hover:-translate-y-px active:translate-y-0",
  btnSm: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm shadow-blue-600/20 transition hover:bg-blue-700",
  btnDanger:
    "inline-flex items-center gap-1.5 text-[13px] font-semibold text-rose-600 hover:text-rose-700 transition",
  // 테두리를 뚜렷하게(slate-300) + 부드러운 그림자
  card: "bg-white rounded-2xl border border-slate-300 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-16px_rgba(15,23,42,0.15)]",
};

/** 브랜드 로고 마크 */
export function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10 text-lg";
  return (
    <span
      className={`${s} rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-600/30`}
    >
      유
    </span>
  );
}

/** 관리자 페이지 공용 셸: 상단 스티키 헤더 + 콘텐츠 컨테이너 */
export function AdminShell({
  title,
  breadcrumb,
  viewHref,
  viewLabel = "공개 페이지 보기",
  children,
}: {
  title?: string;
  breadcrumb?: string;
  viewHref?: string;
  viewLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/60">
      <header className="sticky top-0 z-40 border-b border-slate-300 bg-white/85 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {breadcrumb ? (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">콘솔</span>
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
                <LogoMark size="sm" />
                <span className="font-bold text-slate-900">관리자 콘솔</span>
              </Link>
            )}
            {breadcrumb && (
              <>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-slate-900 truncate">{breadcrumb}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {viewHref && (
              <Link
                href={viewHref}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
              >
                {viewLabel}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            )}
            {!breadcrumb && <LogoutButton />}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {title && (
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
}

/** 흰 카드 섹션 */
export function Panel({
  title,
  desc,
  children,
  accent = false,
}: {
  title?: string;
  desc?: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <section
      className={`${ui.card} p-5 sm:p-6 ${accent ? "ring-1 ring-blue-200" : ""}`}
    >
      {title && (
        <div className="mb-4">
          <h2 className="font-bold text-slate-900">{title}</h2>
          {desc && <p className="text-[13px] text-slate-500 mt-1">{desc}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
