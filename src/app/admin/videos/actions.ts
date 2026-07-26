"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function refresh() {
  revalidatePath("/insights");
  revalidatePath("/admin/videos");
}

/** 유튜브 URL 또는 ID에서 영상 ID만 추출 */
function parseYoutubeId(input: string): string {
  const s = input.trim();
  const m = s.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (m) return m[1];
  // 이미 ID만 넣은 경우
  const idOnly = s.match(/^[A-Za-z0-9_-]{11}$/);
  return idOnly ? s : s;
}

function fields(formData: FormData) {
  const startRaw = String(formData.get("start_seconds") ?? "").trim();
  return {
    youtube_id: parseYoutubeId(String(formData.get("youtube_id") ?? "")),
    title: String(formData.get("title") ?? "").trim(),
    channel: String(formData.get("channel") ?? "").trim() || null,
    date: String(formData.get("date") ?? "").trim() || null,
    start_seconds: startRaw ? Number(startRaw) : null,
    note: String(formData.get("note") ?? "").trim() || null,
    related_topic: String(formData.get("related_topic") ?? "").trim() || null,
  };
}

export async function createVideo(formData: FormData) {
  const supabase = await requireAdmin();
  const f = fields(formData);
  if (!f.youtube_id || !f.title) return;

  const { data: top } = await supabase
    .from("videos")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1);
  const nextOrder = (top?.[0]?.sort_order ?? 0) - 1;

  await supabase.from("videos").insert({ ...f, sort_order: nextOrder });
  refresh();
}

export async function updateVideo(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("videos").update(fields(formData)).eq("id", id);
  refresh();
}

export async function deleteVideo(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("videos").delete().eq("id", id);
  refresh();
}
