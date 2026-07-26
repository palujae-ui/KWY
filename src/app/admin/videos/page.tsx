import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell, ui } from "../_ui";
import { createVideo, updateVideo, deleteVideo } from "./actions";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  youtube_id: string;
  title: string;
  channel: string | null;
  date: string | null;
  start_seconds: number | null;
  note: string | null;
  related_topic: string | null;
};

const inputCls = ui.input;
const labelCls = ui.label;

function Fields({ r }: { r?: Row }) {
  return (
    <>
      <div>
        <label className={labelCls}>
          유튜브 링크 또는 ID <span className="text-red-500">*</span>
        </label>
        <input
          name="youtube_id"
          required
          defaultValue={r?.youtube_id ?? ""}
          placeholder="https://www.youtube.com/watch?v=..."
          className={inputCls}
        />
        <p className="text-[11px] text-slate-400 mt-1">
          유튜브 주소를 그대로 붙여넣으면 됩니다.
        </p>
      </div>
      <div>
        <label className={labelCls}>
          제목 <span className="text-red-500">*</span>
        </label>
        <input name="title" required defaultValue={r?.title ?? ""} className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>채널 (예: YTN)</label>
          <input name="channel" defaultValue={r?.channel ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>날짜 (예: 2026.04.03)</label>
          <input name="date" defaultValue={r?.date ?? ""} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>주제 태그</label>
          <input
            name="related_topic"
            defaultValue={r?.related_topic ?? ""}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>시작 시점(초) — 특정 지점부터 재생</label>
          <input
            name="start_seconds"
            type="number"
            defaultValue={r?.start_seconds ?? ""}
            placeholder="예: 3575"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>안내 문구 (선택)</label>
        <input name="note" defaultValue={r?.note ?? ""} className={inputCls} />
      </div>
    </>
  );
}

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("videos")
    .select("id, youtube_id, title, channel, date, start_seconds, note, related_topic")
    .order("sort_order", { ascending: true });
  const rows = (data ?? []) as Row[];

  return (
    <AdminShell breadcrumb="방송·영상" viewHref="/insights">
        <section className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">＋ 새 영상 추가</h2>
          <form action={createVideo} className="space-y-3">
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
            등록된 영상 <span className="text-blue-600">{rows.length}</span>개
          </h2>
          <p className="text-xs text-slate-400">위에서부터 표시 순서</p>
        </div>

        <div className="space-y-3">
          {rows.map((r) => (
            <details key={r.id} className="group bg-white rounded-2xl border border-slate-300 shadow-sm">
              <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                <img
                  src={`https://i.ytimg.com/vi/${r.youtube_id}/mqdefault.jpg`}
                  alt=""
                  className="w-24 aspect-video object-cover rounded-md border border-slate-300 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.channel}
                    {r.date ? ` · ${r.date}` : ""}
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 group-open:hidden shrink-0">
                  편집 ▾
                </span>
              </summary>
              <div className="border-t border-slate-200 p-5">
                <form action={updateVideo} className="space-y-3">
                  <input type="hidden" name="id" value={r.id} />
                  <Fields r={r} />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                  >
                    저장
                  </button>
                </form>
                <form action={deleteVideo} className="mt-3 pt-3 border-t border-slate-200">
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" className="text-xs font-medium text-red-600 hover:text-red-700">
                    이 영상 삭제
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
    </AdminShell>
  );
}
