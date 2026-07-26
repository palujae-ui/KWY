import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "../_ui";
import {
  createEducation,
  updateEducation,
  deleteEducation,
  createCareer,
  updateCareer,
  deleteCareer,
} from "./actions";

export const dynamic = "force-dynamic";

const inputCls = ui.input;
const labelCls = ui.label;

type Edu = { id: number; degree: string | null; field: string | null; school: string | null; ym: string | null; note: string | null };
type Car = { id: number; role: string | null; org: string | null; from_period: string | null; to_period: string | null; is_primary: boolean | null };

function EduFields({ r }: { r?: Edu }) {
  return (
    <>
      <div className="grid grid-cols-[100px_1fr] gap-3">
        <div>
          <label className={labelCls}>학위</label>
          <select name="degree" defaultValue={r?.degree ?? "박사"} className={inputCls}>
            <option>박사</option>
            <option>석사</option>
            <option>학사</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>
            학교 <span className="text-red-500">*</span>
          </label>
          <input name="school" required defaultValue={r?.school ?? ""} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>전공</label>
          <input name="field" defaultValue={r?.field ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>취득연월 (YYYYMM)</label>
          <input name="ym" defaultValue={r?.ym ?? ""} placeholder="200308" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>비고 (예: Cum laude)</label>
          <input name="note" defaultValue={r?.note ?? ""} className={inputCls} />
        </div>
      </div>
    </>
  );
}

function CarFields({ r }: { r?: Car }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>
            기관 <span className="text-red-500">*</span>
          </label>
          <input name="org" required defaultValue={r?.org ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>직위 / 역할</label>
          <input name="role" defaultValue={r?.role ?? ""} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
        <div>
          <label className={labelCls}>시작 (예: 2010.09)</label>
          <input name="from_period" defaultValue={r?.from_period ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>종료 (비우면 &lsquo;현재&rsquo;)</label>
          <input name="to_period" defaultValue={r?.to_period ?? ""} className={inputCls} />
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 pb-2 whitespace-nowrap">
          <input type="checkbox" name="is_primary" defaultChecked={!!r?.is_primary} className="rounded border-slate-300" />
          상근 재직
        </label>
      </div>
    </>
  );
}

export default async function AdminCareerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [{ data: edu }, { data: car }] = await Promise.all([
    supabase.from("education").select("id, degree, field, school, ym, note").order("sort_order"),
    supabase.from("career").select("id, role, org, from_period, to_period, is_primary").order("sort_order"),
  ]);
  const eduRows = (edu ?? []) as Edu[];
  const carRows = (car ?? []) as Car[];

  return (
    <AdminShell breadcrumb="약력 (학력·경력)" viewHref="/profile">
      <div className="space-y-12">
        {/* 학력 */}
        <section>
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">학력</h2>
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-3">＋ 학력 추가</p>
            <form action={createEducation} className="space-y-3">
              <EduFields />
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">추가</button>
            </form>
          </div>
          <div className="space-y-2.5 mt-4">
            {eduRows.map((r) => (
              <details key={r.id} className="group bg-white rounded-2xl border border-slate-300 shadow-sm">
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                  <span className="font-semibold text-sm text-slate-900">
                    {r.school} <span className="text-slate-400 font-normal">· {r.degree} {r.field}</span>
                  </span>
                  <span className="text-xs text-slate-400 group-open:hidden">편집 ▾</span>
                </summary>
                <div className="border-t border-slate-200 p-5">
                  <form action={updateEducation} className="space-y-3">
                    <input type="hidden" name="id" value={r.id} />
                    <EduFields r={r} />
                    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">저장</button>
                  </form>
                  <form action={deleteEducation} className="mt-3 pt-3 border-t border-slate-200">
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700">삭제</button>
                  </form>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 경력 */}
        <section>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">경력</h2>
          <p className="text-xs text-slate-500 mb-4">‘상근 재직’ 체크 = 근무경력(강조), 미체크 = 위원·편집위원직</p>
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-3">＋ 경력 추가</p>
            <form action={createCareer} className="space-y-3">
              <CarFields />
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">추가</button>
            </form>
          </div>
          <div className="space-y-2.5 mt-4">
            {carRows.map((r) => (
              <details key={r.id} className="group bg-white rounded-2xl border border-slate-300 shadow-sm">
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                  <span className="font-semibold text-sm text-slate-900">
                    {r.is_primary && <span className="text-blue-600 mr-1">●</span>}
                    {r.org} <span className="text-slate-400 font-normal">· {r.role}</span>
                  </span>
                  <span className="text-xs text-slate-400 group-open:hidden whitespace-nowrap ml-2">
                    {r.from_period}~{r.to_period ?? "현재"} 편집 ▾
                  </span>
                </summary>
                <div className="border-t border-slate-200 p-5">
                  <form action={updateCareer} className="space-y-3">
                    <input type="hidden" name="id" value={r.id} />
                    <CarFields r={r} />
                    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">저장</button>
                  </form>
                  <form action={deleteCareer} className="mt-3 pt-3 border-t border-slate-200">
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700">삭제</button>
                  </form>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
