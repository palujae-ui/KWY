import { createClient } from "@supabase/supabase-js";
import { columns as fallbackColumns, type Column } from "@/data/insights";

/**
 * 공개 페이지용 데이터 조회 — anon 키(쿠키 없음) 클라이언트.
 * RLS로 읽기만 가능. DB 오류/빈 결과 시 기존 TS 데이터로 폴백(안전).
 */
const publicDb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getColumns(): Promise<Column[]> {
  try {
    const { data, error } = await publicDb
      .from("columns")
      .select("title, outlet, date, url")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackColumns;
    return data as Column[];
  } catch {
    return fallbackColumns;
  }
}
