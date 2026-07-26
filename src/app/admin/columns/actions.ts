"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * 칼럼(경제 인사이트) CRUD 서버 액션.
 * - 쿠키 세션 기반 서버 클라이언트를 쓰므로 RLS가 그대로 적용된다(관리자만 쓰기).
 * - 저장 후 공개 /insights 와 관리자 목록을 즉시 갱신(revalidatePath).
 */

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
  revalidatePath("/admin/columns");
}

export async function createColumn(formData: FormData) {
  const supabase = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  // 최상단(sort_order 최소값 - 1)에 추가 → 최신이 위로
  const { data: top } = await supabase
    .from("columns")
    .select("sort_order")
    .order("sort_order", { ascending: true })
    .limit(1);
  const nextOrder = (top?.[0]?.sort_order ?? 0) - 1;

  await supabase.from("columns").insert({
    title,
    outlet: String(formData.get("outlet") ?? "").trim() || null,
    date: String(formData.get("date") ?? "").trim() || null,
    url: String(formData.get("url") ?? "").trim() || null,
    sort_order: nextOrder,
  });
  refresh();
}

export async function updateColumn(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;

  await supabase
    .from("columns")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      outlet: String(formData.get("outlet") ?? "").trim() || null,
      date: String(formData.get("date") ?? "").trim() || null,
      url: String(formData.get("url") ?? "").trim() || null,
    })
    .eq("id", id);
  refresh();
}

export async function deleteColumn(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  await supabase.from("columns").delete().eq("id", id);
  refresh();
}
