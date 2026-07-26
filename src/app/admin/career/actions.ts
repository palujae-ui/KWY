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
  revalidatePath("/profile");
  revalidatePath("/admin/career");
}

async function nextOrder(table: string, supabase: Awaited<ReturnType<typeof requireAdmin>>) {
  const { data } = await supabase
    .from(table)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  return (data?.[0]?.sort_order ?? -1) + 1;
}

// ---------- 학력 (education) ----------
function eduFields(fd: FormData) {
  return {
    degree: String(fd.get("degree") ?? "").trim() || null,
    field: String(fd.get("field") ?? "").trim() || null,
    school: String(fd.get("school") ?? "").trim() || null,
    ym: String(fd.get("ym") ?? "").trim() || null,
    note: String(fd.get("note") ?? "").trim() || null,
  };
}

export async function createEducation(fd: FormData) {
  const s = await requireAdmin();
  if (!String(fd.get("school") ?? "").trim()) return;
  await s.from("education").insert({ ...eduFields(fd), sort_order: await nextOrder("education", s) });
  refresh();
}
export async function updateEducation(fd: FormData) {
  const s = await requireAdmin();
  const id = Number(fd.get("id"));
  if (!id) return;
  await s.from("education").update(eduFields(fd)).eq("id", id);
  refresh();
}
export async function deleteEducation(fd: FormData) {
  const s = await requireAdmin();
  const id = Number(fd.get("id"));
  if (!id) return;
  await s.from("education").delete().eq("id", id);
  refresh();
}

// ---------- 경력 (career) ----------
function careerFields(fd: FormData) {
  const primary = fd.get("is_primary") === "on";
  return {
    role: String(fd.get("role") ?? "").trim() || null,
    org: String(fd.get("org") ?? "").trim() || null,
    from_period: String(fd.get("from_period") ?? "").trim() || null,
    to_period: String(fd.get("to_period") ?? "").trim() || null,
    is_primary: primary,
    category: primary ? "employment" : "appointment",
  };
}

export async function createCareer(fd: FormData) {
  const s = await requireAdmin();
  if (!String(fd.get("org") ?? "").trim()) return;
  await s.from("career").insert({ ...careerFields(fd), sort_order: await nextOrder("career", s) });
  refresh();
}
export async function updateCareer(fd: FormData) {
  const s = await requireAdmin();
  const id = Number(fd.get("id"));
  if (!id) return;
  await s.from("career").update(careerFields(fd)).eq("id", id);
  refresh();
}
export async function deleteCareer(fd: FormData) {
  const s = await requireAdmin();
  const id = Number(fd.get("id"));
  if (!id) return;
  await s.from("career").delete().eq("id", id);
  refresh();
}
