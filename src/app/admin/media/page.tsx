import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "../_ui";
import { createMedia, updateMedia, deleteMedia } from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  headline: string;
  outlet: string | null;
  reporter: string | null;
  date: string | null;
  url: string | null;
  context: string | null;
  quotes: string[] | null;
  related_topic: string | null;
};

const inputCls = ui.input;
const labelCls = ui.label;

function Fields({ r }: { r?: Row }) {
  const quotesText = (r?.quotes ?? []).join("\n\n");
  return (
    <>
      <div>
        <label className={labelCls}>
          기사 제목 <span className="text-red-500">*</span>
        </label>
        <input name="headline" required defaultValue={r?.headline ?? ""} className={inputCls} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>매체</label>
          <input name="outlet" defaultValue={r?.outlet ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>기자</label>
          <input name="reporter" defaultValue={r?.reporter ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>날짜</label>
          <input name="date" defaultValue={r?.date ?? ""} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>원문 링크 (URL)</label>
        <input name="url" type="url" defaultValue={r?.url ?? ""} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>기사 소개 (맥락)</label>
        <textarea name="context" rows={2} defaultValue={r?.context ?? ""} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>인용 발언</label>
        <textarea
          name="quotes"
          rows={5}
          defaultValue={quotesText}
          placeholder={"발언을 입력하세요.\n\n여러 개면 빈 줄로 구분합니다."}
          className={inputCls}
        />
        <p className="text-[11px] text-slate-400 mt-1">
          발언이 여러 개면 <b>빈 줄(엔터 두 번)</b>로 구분하세요. 각 발언은 인용부호 카드로 표시됩니다.
        </p>
      </div>
      <div>
        <label className={labelCls}>주제 태그</label>
        <input name="related_topic" defaultValue={r?.related_topic ?? ""} className={inputCls} />
      </div>
    </>
  );
}

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("media_appearances")
    .select("id, headline, outlet, reporter, date, url, context, quotes, related_topic")
    .order("sort_order", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <AdminShell breadcrumb="언론 인용·인터뷰" viewHref="/insights">
        <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">＋ 새 언론 인용 추가</h2>
          <form action={createMedia} className="space-y-3">
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
            등록된 기사 <span className="text-blue-600">{rows.length}</span>건
          </h2>
        </div>

        <div className="space-y-3">
          {rows.map((r) => (
            <details key={r.id} className="group bg-white rounded-2xl border border-slate-300 shadow-sm">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{r.headline}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.outlet}
                    {r.date ? ` · ${r.date}` : ""} · 인용 {r.quotes?.length ?? 0}개
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 group-open:hidden shrink-0">
                  편집 ▾
                </span>
              </summary>
              <div className="border-t border-slate-200 p-5">
                <form action={updateMedia} className="space-y-3">
                  <input type="hidden" name="id" value={r.id} />
                  <Fields r={r} />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                  >
                    저장
                  </button>
                </form>
                <form action={deleteMedia} className="mt-3 pt-3 border-t border-slate-200">
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700">
                    이 기사 삭제
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
    </AdminShell>
  );
}
