/**
 * education + career 시드 — src/data/career.ts 파싱해 DB로 이전. 스키마 적용 후 실행.
 *   node scripts/seed-career.mjs
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

const src = fs.readFileSync(new URL("../src/data/career.ts", import.meta.url), "utf8");
const str = (o, k) => {
  const m = o.match(new RegExp(k + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'));
  return m ? m[1] : null;
};

function objs(arrName, typeName) {
  const arr = src.match(new RegExp("export const " + arrName + ": " + typeName + "\\[\\] = \\[([\\s\\S]*?)\\n\\];"));
  if (!arr) throw new Error(arrName + " 배열을 찾지 못함");
  return [...arr[1].matchAll(/\{[^{}]*\}/g)].map((m) => m[0]);
}

const education = objs("education", "Education").map((o, i) => ({
  degree: str(o, "degree"),
  field: str(o, "field"),
  school: str(o, "school"),
  ym: str(o, "ym"),
  note: str(o, "note"),
  sort_order: i,
}));

const career = objs("career", "CareerItem").map((o, i) => {
  const primary = /primary:\s*true/.test(o);
  const toNull = /to:\s*null/.test(o);
  return {
    role: str(o, "role"),
    org: str(o, "org"),
    from_period: str(o, "from"),
    to_period: toNull ? null : str(o, "to"),
    is_primary: primary,
    category: primary ? "employment" : "appointment",
    sort_order: i,
  };
});

console.log(`파싱: 학력 ${education.length} / 경력 ${career.length} (근무 ${career.filter((c) => c.is_primary).length})`);

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

for (const [table, rows] of [["education", education], ["career", career]]) {
  const del = await admin.from(table).delete().neq("id", -1);
  if (del.error) throw del.error;
  const ins = await admin.from(table).insert(rows).select("id");
  if (ins.error) throw ins.error;
  console.log(`${table} 시드: ${ins.data.length}건`);
}
