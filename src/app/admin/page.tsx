import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

// 관리자 페이지는 항상 서버에서 세션을 확인해야 하므로 캐시하지 않는다.
export const dynamic = "force-dynamic";

/**
 * 관리자 대시보드.
 * Step 1(현재): 로그인 확인 + 섹션 목록(자리표시). 실제 편집 CRUD는 다음 단계에서 연결.
 */
const SECTIONS = [
  { key: "columns", label: "경제 인사이트 (칼럼)", desc: "내일신문 경제시평 등 기고", href: "/admin/columns", ready: true },
  { key: "videos", label: "방송·영상", desc: "유튜브 영상", href: "/admin/videos", ready: true },
  { key: "profile", label: "프로필 · 소개", desc: "성함·소속·헤드라인·소개·연락처", ready: false },
  { key: "career", label: "약력", desc: "학력·근무경력·위원 활동", ready: false },
  { key: "publications", label: "연구 (논문)", desc: "논문·보고서·수상", ready: false },
  { key: "media", label: "언론 인용·인터뷰", desc: "방송·신문 인용", href: "/admin/media", ready: true },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // proxy에서 이미 막지만, 안전을 위해 서버에서도 재확인
  if (!user) redirect("/admin/login");

  const username =
    (user.user_metadata?.username as string | undefined) ??
    user.email?.split("@")[0] ??
    "관리자";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              유
            </div>
            <span className="font-bold text-slate-900">관리자</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              홈페이지 보기 ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-800">{username}</span> 님, 환영합니다.
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
          콘텐츠 관리
        </h1>
        <p className="text-slate-600 mt-2 text-sm">
          수정할 항목을 선택하세요. 저장하면 홈페이지에 자동 반영됩니다.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          {SECTIONS.map((s) => (
            <div
              key={s.key}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-900">{s.label}</h2>
                  {!s.ready && (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      준비 중
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1.5">{s.desc}</p>
              </div>
              {s.ready && s.href ? (
                <Link
                  href={s.href}
                  className="mt-4 self-start text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors"
                >
                  편집하기 →
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 self-start text-sm font-medium text-slate-400 bg-slate-100 rounded-lg px-4 py-2 cursor-not-allowed"
                >
                  편집 (다음 단계)
                </button>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-8">
          ‘경제 인사이트(칼럼)’ 편집이 활성화되었습니다. 나머지 항목은 순차적으로 연결됩니다.
        </p>
      </div>
    </main>
  );
}
