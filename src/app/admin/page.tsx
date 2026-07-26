import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "./_ui";

export const dynamic = "force-dynamic";

type Section = {
  key: string;
  label: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  accent: string; // tailwind color classes for the icon chip
};

const I = {
  doc: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  play: <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  quote: <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />,
  book: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  brief: <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v1m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
};

const SECTIONS: Section[] = [
  { key: "columns", label: "경제 인사이트 (칼럼)", desc: "내일신문 경제시평 등 기고", href: "/admin/columns", icon: I.doc, accent: "bg-blue-50 text-blue-600 ring-blue-100" },
  { key: "videos", label: "방송·영상", desc: "유튜브 영상", href: "/admin/videos", icon: I.play, accent: "bg-rose-50 text-rose-600 ring-rose-100" },
  { key: "media", label: "언론 인용·인터뷰", desc: "방송·신문 인용", href: "/admin/media", icon: I.quote, accent: "bg-amber-50 text-amber-600 ring-amber-100" },
  { key: "publications", label: "연구 (논문)", desc: "논문·보고서·수상", href: "/admin/publications", icon: I.book, accent: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
  { key: "career", label: "약력", desc: "학력·근무경력·위원 활동", href: "/admin/career", icon: I.brief, accent: "bg-indigo-50 text-indigo-600 ring-indigo-100" },
  { key: "profile", label: "프로필 · 소개", desc: "성함·소속·헤드라인·소개·연락처", href: "/admin/profile", icon: I.user, accent: "bg-violet-50 text-violet-600 ring-violet-100" },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const username =
    (user.user_metadata?.username as string | undefined) ??
    user.email?.split("@")[0] ??
    "관리자";

  return (
    <AdminShell>
      {/* 인사 */}
      <div className="mb-8">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{username}</span> 님, 환영합니다
        </p>
        <h1 className="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-slate-900 mt-1">
          콘텐츠 관리
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          수정할 항목을 선택하세요. 저장하면 홈페이지에 자동으로 반영됩니다.
        </p>
      </div>

      {/* 섹션 카드 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className={`${ui.card} group p-5 flex items-start gap-4 transition hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_18px_36px_-18px_rgba(15,23,42,0.22)]`}
          >
            <span className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${s.accent}`}>
              <svg className="w-5.5 h-5.5 w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {s.icon}
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-bold text-slate-900 group-hover:text-blue-700 transition">
                  {s.label}
                </span>
              </span>
              <span className="block text-[13px] text-slate-500 mt-1">{s.desc}</span>
              <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600 mt-3 group-hover:gap-1.5 transition-all">
                편집하기
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </span>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-8">
        저서·학술지 편집·연구 관심분야는 변경 빈도가 낮아 순차적으로 추가됩니다.
      </p>
    </AdminShell>
  );
}
