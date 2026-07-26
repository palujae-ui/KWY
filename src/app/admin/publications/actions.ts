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
  revalidatePath("/research");
  revalidatePath("/"); // 홈 통계·대표연구
  revalidatePath("/admin/publications");
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    venue: String(formData.get("venue") ?? "").trim() || null,
    ym: String(formData.get("ym") ?? "").trim() || null,
    type: String(formData.get("type") ?? "").trim() || null,
    topics: formData.getAll("topics").map((t) => String(t)),
    award: String(formData.get("award") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
  };
}

export async function createPublication(formData: FormData) {
  const supabase = await requireAdmin();
  const f = fields(formData);
  if (!f.title) return;

  const { data: top } = await supabase
    .from("publications")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1);
  const nextOrder = (top?.[0]?.sort_order ?? 0) - 1;

  await supabase.from("publications").insert({ ...f, sort_order: nextOrder });
  refresh();
}

export async function updatePublication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("publications").update(fields(formData)).eq("id", id);
  refresh();
}

export async function deletePublication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("publications").delete().eq("id", id);
  refresh();
}
