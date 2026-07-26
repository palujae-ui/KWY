/**
 * publications 시드 — src/data/publications.ts 를 파싱해 DB로 이전.
 * 스키마 + 0002_pub_featured.sql 적용 후 실행.
 *   node scripts/seed-publications.mjs
 * id는 DB가 새로 부여(관리자 추가 시 충돌 방지). featured 는 기존 featuredIds 기준.
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

const src = fs.readFileSync(new URL("../src/data/publications.ts", import.meta.url), "utf8");

// featuredIds 추출
const fm = src.match(/featuredIds = \[([^\]]*)\]/);
const featuredIds = fm ? fm[1].split(",").map((s) => Number(s.trim())).filter(Boolean) : [];

// publications 배열 각 항목 파싱
const arr = src.match(/export const publications: Publication\[\] = \[([\s\S]*?)\n\];/);
if (!arr) throw new Error("publications 배열을 찾지 못함");
const objs = [...arr[1].matchAll(/\{[^{}]*\}/g)].map((m) => m[0]);

const rows = objs
  .map((o) => {
    const num = (k) => {
      const mm = o.match(new RegExp(k + ":\\s*(\\d+)"));
      return mm ? Number(mm[1]) : null;
    };
    const str = (k) => {
      const mm = o.match(new RegExp(k + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'));
      return mm ? mm[1] : null;
    };
    const id = num("id");
    const title = str("title");
    if (id == null || !title) return null;
    const topicsM = o.match(/topics:\s*\[([^\]]*)\]/);
    const topics = topicsM
      ? [...topicsM[1].matchAll(/"([^"]*)"/g)].map((t) => t[1])
      : [];
    return {
      title,
      venue: str("venue"),
      ym: str("ym"),
      type: str("type"),
      topics,
      award: str("award"),
      featured: featuredIds.includes(id),
    };
  })
  .filter(Boolean)
  // 최신순 sort_order (연월 내림차순)
  .sort((a, b) => {
    const key = (ym) => Number(ym.length >= 6 ? ym.slice(0, 6) : ym.slice(0, 4) + "00");
    return key(b.ym) - key(a.ym);
  })
  .map((r, i) => ({ ...r, sort_order: i }));

console.log(`파싱된 논문: ${rows.length}편 | featured: ${rows.filter((r) => r.featured).length}편`);

const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const del = await admin.from("publications").delete().neq("id", -1);
if (del.error) throw del.error;
const ins = await admin.from("publications").insert(rows).select("id");
if (ins.error) throw ins.error;
console.log(`시드 완료: ${ins.data.length}편 삽입`);
