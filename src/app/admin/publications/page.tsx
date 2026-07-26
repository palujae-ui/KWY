import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "../_ui";
import { ALL_TOPICS, ALL_TYPES, formatYm } from "@/data/publications";
import {
  createPublication,
  updatePublication,
  deletePublication,
} from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  title: string;
  venue: string | null;
  ym: string | null;
  type: string | null;
  topics: string[] | null;
  award: string | null;
  featured: boolean | null;
};

const inputCls = ui.input;
const labelCls = ui.label;

function Fields({ r }: { r?: Row }) {
  const topics = r?.topics ?? [];
  return (
    <>
      <div>
        <label className={labelCls}>
          제목 <span className="text-red-500">*</span>
        </label>
        <input name="title" required defaultValue={r?.title ?? ""} className={inputCls} />
      </div>
      <div className="grid grid-cols-[1fr_120px_140px] gap-3">
        <div>
          <label className={labelCls}>게재지</label>
          <input name="venue" defaultValue={r?.venue ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>연월 (YYYYMM)</label>
          <input name="ym" defaultValue={r?.ym ?? ""} placeholder="202412" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>유형</label>
          <select name="type" defaultValue={r?.type ?? "국내저널"} className={inputCls}>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>주제 (복수 선택)</label>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {ALL_TOPICS.map((t) => (
            <label key={t} className="inline-flex items-center gap-1.5 text-sm text-slate-700">
              <input
                type="checkbox"
                name="topics"
                value={t}
                defaultChecked={topics.includes(t)}
                className="rounded border-slate-300"
              />
              {t}
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
        <div>
          <label className={labelCls}>수상 (있으면)</label>
          <input name="award" defaultValue={r?.award ?? ""} className={inputCls} />
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 pb-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={!!r?.featured}
            className="rounded border-slate-300"
          />
          홈 대표 연구
        </label>
      </div>
    </>
  );
}

export default async function AdminPublicationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("publications")
    .select("id, title, venue, ym, type, topics, award, featured")
    .order("sort_order", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <AdminShell breadcrumb="연구 (논문)" viewHref="/research">
        <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">＋ 새 논문 추가</h2>
          <form action={createPublication} className="space-y-3">
            <Fields />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              추가하기
            </button>
          </form>
        </section>

        <div className="flex items-center justify-between mt-10 mb-3">
          <h2 className="font-bold text-slate-900">
            등록된 논문 <span className="text-blue-600">{rows.length}</span>편
          </h2>
          <p className="text-xs text-slate-400">최신순</p>
        </div>

        <div className="space-y-2.5">
          {rows.map((r) => (
            <details key={r.id} className="group bg-white rounded-2xl border border-slate-300 shadow-sm">
              <summary className="flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer list-none">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">
                    {r.featured && <span className="text-amber-500 mr-1">★</span>}
                    {r.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.ym ? formatYm(r.ym) : ""} · {r.venue} · {r.type}
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 group-open:hidden shrink-0">
                  편집 ▾
                </span>
              </summary>
              <div className="border-t border-slate-200 p-5">
                <form action={updatePublication} className="space-y-3">
                  <input type="hidden" name="id" value={r.id} />
                  <Fields r={r} />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                  >
                    저장
                  </button>
                </form>
                <form action={deletePublication} className="mt-3 pt-3 border-t border-slate-200">
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700">
                    이 논문 삭제
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
    </AdminShell>
  );
}
