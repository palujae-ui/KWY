"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // 소개글: 빈 줄로 문단 구분
  const intro = String(formData.get("intro") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s*\n\s*/g, " "))
    .filter(Boolean);

  const str = (k: string) => String(formData.get(k) ?? "").trim();

  await supabase
    .from("profile")
    .update({
      name_ko: str("name_ko"),
      name_en: str("name_en"),
      name_hanja: str("name_hanja") || null,
      affiliation: str("affiliation"),
      affiliation_en: str("affiliation_en") || null,
      title: str("title"),
      tagline: str("tagline"),
      intro,
      email: str("email"),
      phone: str("phone"),
      office: str("office"),
    })
    .eq("id", 1);

  // 프로필은 여러 페이지에 반영됨
  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/cv");
  revalidatePath("/admin/profile");
}
