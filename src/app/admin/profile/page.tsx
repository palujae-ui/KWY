import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "../_ui";
import { updateProfile } from "./actions";

export const dynamic = "force-dynamic";

const inputCls = ui.input;
const labelCls = ui.label;

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
    <AdminShell breadcrumb="프로필 · 소개" viewHref="/">
        <form action={updateProfile} className="space-y-6">
          {/* 헤드라인 */}
          <section className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-1">홈 헤드라인 (한 줄 소개)</h2>
            <p className="text-xs text-slate-500 mb-3">
              홈페이지 첫 화면에 크게 표시되는 문구입니다. 교수님의 커리어를 한 줄로 규정합니다.
            </p>
            <input name="tagline" defaultValue={p.tagline ?? ""} className={inputCls} />
          </section>

          {/* 소개글 */}
          <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-1">소개 글</h2>
            <p className="text-xs text-slate-500 mb-3">
              문단을 나누려면 <b>빈 줄(엔터 두 번)</b>로 구분하세요.
            </p>
            <textarea name="intro" rows={10} defaultValue={introText} className={inputCls} />
          </section>

          {/* 기본 정보 */}
          <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm space-y-3">
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
          <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm space-y-3">
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
    </AdminShell>
  );
}
