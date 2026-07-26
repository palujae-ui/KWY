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
  revalidatePath("/admin/media");
}

function fields(formData: FormData) {
  // 인용문: 빈 줄로 구분해 여러 개 입력(각 인용문은 여러 줄일 수 있으므로 빈 줄 기준 분리)
  const quotesRaw = String(formData.get("quotes") ?? "");
  const quotes = quotesRaw
    .split(/\n\s*\n/)
    .map((q) => q.trim().replace(/\s*\n\s*/g, " "))
    .filter(Boolean);

  return {
    headline: String(formData.get("headline") ?? "").trim(),
    outlet: String(formData.get("outlet") ?? "").trim() || null,
    reporter: String(formData.get("reporter") ?? "").trim() || null,
    date: String(formData.get("date") ?? "").trim() || null,
    url: String(formData.get("url") ?? "").trim() || null,
    context: String(formData.get("context") ?? "").trim() || null,
    quotes,
    related_topic: String(formData.get("related_topic") ?? "").trim() || null,
  };
}

export async function createMedia(formData: FormData) {
  const supabase = await requireAdmin();
  const f = fields(formData);
  if (!f.headline) return;

  const { data: top } = await supabase
    .from("media_appearances")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1);
  const nextOrder = (top?.[0]?.sort_order ?? 0) - 1;

  await supabase.from("media_appearances").insert({ ...f, sort_order: nextOrder });
  refresh();
}

export async function updateMedia(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("media_appearances").update(fields(formData)).eq("id", id);
  refresh();
}

export async function deleteMedia(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("media_appearances").delete().eq("id", id);
  refresh();
}
