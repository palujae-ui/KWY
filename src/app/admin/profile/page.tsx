import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "./actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900";
const labelCls = "block text-xs font-semibold text-slate-600 mb-1";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
  const p = data ?? {};
  const introText = Array.isArray(p.intro) ? p.intro.join("\n\n") : "";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/admin" className="text-slate-500 hover:text-slate-900">← 관리자</Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900">프로필 · 소개</span>
          </div>
          <Link href="/" target="_blank" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            홈페이지 보기 ↗
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form action={updateProfile} className="space-y-6">
          {/* 헤드라인 */}
          <section className="bg-white rounded-2xl border border-blue-200 p-6 shadow-xs">
            <h2 className="font-bold text-slate-900 mb-1">홈 헤드라인 (한 줄 소개)</h2>
            <p className="text-xs text-slate-500 mb-3">
              홈페이지 첫 화면에 크게 표시되는 문구입니다. 교수님의 커리어를 한 줄로 규정합니다.
            </p>
            <input name="tagline" defaultValue={p.tagline ?? ""} className={inputCls} />
          </section>

          {/* 소개글 */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="font-bold text-slate-900 mb-1">소개 글</h2>
            <p className="text-xs text-slate-500 mb-3">
              문단을 나누려면 <b>빈 줄(엔터 두 번)</b>로 구분하세요.
            </p>
            <textarea name="intro" rows={10} defaultValue={introText} className={inputCls} />
          </section>

          {/* 기본 정보 */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h2 className="font-bold text-slate-900 mb-1">기본 정보</h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>성함(국문)</label>
                <input name="name_ko" defaultValue={p.name_ko ?? ""} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>성함(영문)</label>
                <input name="name_en" defaultValue={p.name_en ?? ""} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>성함(한자)</label>
                <input name="name_hanja" defaultValue={p.name_hanja ?? ""} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div>
                <label className={labelCls}>소속</label>
                <input name="affiliation" defaultValue={p.affiliation ?? ""} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>직위</label>
                <input name="title" defaultValue={p.title ?? ""} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>소속(영문)</label>
              <input name="affiliation_en" defaultValue={p.affiliation_en ?? ""} className={inputCls} />
            </div>
          </section>

          {/* 연락처 */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h2 className="font-bold text-slate-900 mb-1">연락처</h2>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>이메일</label>
                <input name="email" defaultValue={p.email ?? ""} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>전화</label>
                <input name="phone" defaultValue={p.phone ?? ""} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>연구실</label>
                <input name="office" defaultValue={p.office ?? ""} className={inputCls} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              ※ 성함·연락처는 홈·약력·CV에 반영됩니다. (상단 헤더/하단 푸터의 성함 표기는 고정)
            </p>
          </section>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            저장하기
          </button>
        </form>
      </div>
    </main>
  );
}
