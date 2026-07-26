/**
 * 관리자 계정 1회 생성 스크립트 (로컬 전용).
 * service_role 키로 Supabase Auth 사용자를 만든다. 브라우저·배포와 무관.
 *
 * 실행: node scripts/create-admin.mjs
 *
 * 로그인 ID "palujae" → 내부 이메일 "palujae@palujae-ui.com" 로 매핑.
 * 비밀번호는 인자/환경변수로 받는다(코드에 하드코딩하지 않음).
 *   node scripts/create-admin.mjs "<비밀번호>"
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

const ADMIN_ID = "palujae";
const ADMIN_EMAIL = `${ADMIN_ID}@palujae-ui.com`;
const password = process.argv[2] || process.env.ADMIN_PASSWORD;

if (!password) {
  console.error("비밀번호를 인자로 전달하세요: node scripts/create-admin.mjs <비밀번호>");
  process.exit(1);
}

const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// 이미 있으면 비밀번호만 갱신, 없으면 생성
const { data: list } = await admin.auth.admin.listUsers();
const existing = list?.users?.find((u) => u.email === ADMIN_EMAIL);

let userId;
if (existing) {
  const { data, error } = await admin.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) throw error;
  userId = data.user.id;
  console.log("기존 관리자 비밀번호 갱신:", ADMIN_EMAIL);
} else {
  const { data, error } = await admin.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password,
    email_confirm: true,
    user_metadata: { username: ADMIN_ID, role: "admin" },
  });
  if (error) throw error;
  userId = data.user.id;
  console.log("관리자 생성:", ADMIN_EMAIL);
}

// 로그인 검증 (anon 키로 실제 signInWithPassword)
const pub = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const { data: signin, error: signErr } = await pub.auth.signInWithPassword({
  email: ADMIN_EMAIL,
  password,
});
console.log(
  "로그인 검증:",
  signErr ? "❌ 실패 - " + signErr.message : "✓ 성공 (user " + signin.user.id.slice(0, 8) + "…)"
);
console.log("userId:", userId);
