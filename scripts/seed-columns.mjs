/**
 * columns(경제 인사이트) 테이블 시드 — 현재 src/data/insights.ts 의 칼럼을 DB로 이전.
 * service_role 로 실행(로컬 전용). 스키마(schema.sql) 적용 후 실행.
 *   node scripts/seed-columns.mjs
 * 재실행 시 기존 행을 지우고 다시 넣는다(idempotent).
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

// insights.ts 의 columns 배열을 직접 정의하지 않고, 소스에서 정규식으로 안전 추출하기보다
// 값이 바뀌면 이 파일도 갱신되도록 명시적으로 가져온다.
// (data 파일은 TS라 mjs에서 직접 import 불가 → 필요한 필드만 파싱)
const src = fs.readFileSync(new URL("../src/data/insights.ts", import.meta.url), "utf8");
const block = src.match(/export const columns: Column\[\] = \[([\s\S]*?)\];/);
if (!block) throw new Error("insights.ts 에서 columns 배열을 찾지 못했습니다.");
const rows = [...block[1].matchAll(/\{[^}]*\}/g)].map((m, idx) => {
  const o = m[0];
  const get = (k) => {
    const mm = o.match(new RegExp(k + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'));
    return mm ? mm[1] : null;
  };
  return {
    title: get("title"),
    outlet: get("outlet"),
    date: get("date"),
    url: get("url"),
    sort_order: idx,
  };
});

const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

console.log(`파싱된 칼럼: ${rows.length}건`);

// 기존 삭제 후 삽입
const del = await admin.from("columns").delete().neq("id", -1);
if (del.error) throw del.error;
const ins = await admin.from("columns").insert(rows).select();
if (ins.error) throw ins.error;

console.log(`시드 완료: ${ins.data.length}건 삽입`);
console.log("첫 항목:", ins.data[0]?.title, "| 마지막:", ins.data.at(-1)?.title);
