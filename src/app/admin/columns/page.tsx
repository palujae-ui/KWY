import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createColumn, updateColumn, deleteColumn } from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  title: string;
  outlet: string | null;
  date: string | null;
  url: string | null;
};

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900";

export default async function AdminColumnsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("columns")
    .select("id, title, outlet, date, url")
    .order("sort_order", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/admin" className="text-slate-500 hover:text-slate-900">
              ← 관리자
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900">경제 인사이트 (칼럼)</span>
          </div>
          <Link
            href="/insights"
            target="_blank"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            공개 페이지 보기 ↗
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* 새 칼럼 추가 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h2 className="font-bold text-slate-900 mb-4">＋ 새 칼럼 추가</h2>
          <form action={createColumn} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                제목 <span className="text-red-500">*</span>
              </label>
              <input name="title" required className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  매체
                </label>
                <input
                  name="outlet"
                  defaultValue="내일신문 「경제시평」"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  게재일 (예: 2026.04.03)
                </label>
                <input name="date" placeholder="YYYY.MM.DD" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                원문 링크 (URL)
              </label>
              <input name="url" type="url" placeholder="https://..." className={inputCls} />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              추가하기
            </button>
          </form>
        </section>

        {/* 목록 */}
        <div className="flex items-center justify-between mt-10 mb-3">
          <h2 className="font-bold text-slate-900">
            등록된 칼럼 <span className="text-blue-600">{rows.length}</span>편
          </h2>
          <p className="text-xs text-slate-400">위에서부터 최신순으로 표시됩니다</p>
        </div>

        <div className="space-y-3">
          {rows.map((r) => (
            <details
              key={r.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-xs"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.date} · {r.outlet}
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 group-open:hidden">
                  펼쳐서 편집 ▾
                </span>
              </summary>

              <div className="border-t border-slate-100 p-5">
                <form action={updateColumn} className="space-y-3">
                  <input type="hidden" name="id" value={r.id} />
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      제목
                    </label>
                    <input name="title" defaultValue={r.title} required className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        매체
                      </label>
                      <input name="outlet" defaultValue={r.outlet ?? ""} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        게재일
                      </label>
                      <input name="date" defaultValue={r.date ?? ""} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      원문 링크
                    </label>
                    <input name="url" type="url" defaultValue={r.url ?? ""} className={inputCls} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                    >
                      저장
                    </button>
                  </div>
                </form>

                <form action={deleteColumn} className="mt-3 pt-3 border-t border-slate-100">
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="text-xs font-medium text-red-600 hover:text-red-700"
                  >
                    이 칼럼 삭제
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
