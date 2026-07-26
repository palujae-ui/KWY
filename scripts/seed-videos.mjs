/**
 * videos(방송·영상) 테이블 시드. 스키마 적용 후 실행.
 *   node scripts/seed-videos.mjs
 * 영상은 4건으로 안정적이라 명시적으로 정의(재실행 시 전체 교체).
 */
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = Object.fromEntries(
  fs
    .readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const VIDEOS = [
  { youtube_id: "mpmh7mMU6R0", title: "소득 이어 지출도 양극화…지난해 가계 흑자 사상 최고", channel: "YTN", date: null, start_seconds: null, note: null, related_topic: "소득분배 · 가계저축" },
  { youtube_id: "Wopvrn0g9Ow", title: "지난해 전 분기 전국 가계 흑자율 30% 이상…사상 최대", channel: "JTBC 아침&", date: null, start_seconds: null, note: null, related_topic: "가계저축 · 소비" },
  { youtube_id: "Srk22aerfd4", title: "‘4년새 빚은 두배나 껑충, 소득은 7% 감소’…20대가 제일 힘들다", channel: "KBS News", date: "2023.12.15", start_seconds: null, note: null, related_topic: "가계부채 · 소득분배" },
  { youtube_id: "htKh-hbzqhU", title: "제4회 한국의 사회동향 포럼 — 유경원 교수 발표", channel: "KOSSDA 한국사회과학자료원", date: null, start_seconds: 3575, note: "발표는 영상 59분 35초(59:35) 지점부터 시작됩니다.", related_topic: "사회동향 · 소득분배" },
].map((v, i) => ({ ...v, sort_order: i }));

const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const del = await admin.from("videos").delete().neq("id", -1);
if (del.error) throw del.error;
const ins = await admin.from("videos").insert(VIDEOS).select();
if (ins.error) throw ins.error;
console.log(`videos 시드 완료: ${ins.data.length}건`);
