/**
 * SQL 파일을 Supabase Postgres에 실행 (DDL/마이그레이션용, 로컬 전용).
 *   node scripts/run-sql.mjs supabase/schema.sql
 * 비밀번호에 특수문자가 있어 URL 대신 구성요소로 연결한다.
 */
import pg from "pg";
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

const file = process.argv[2];
if (!file) {
  console.error("사용법: node scripts/run-sql.mjs <파일.sql>");
  process.exit(1);
}
const sql = fs.readFileSync(new URL("../" + file, import.meta.url), "utf8");

const client = new pg.Client({
  host: env.SUPABASE_DB_HOST,
  port: Number(env.SUPABASE_DB_PORT),
  user: env.SUPABASE_DB_USER,
  password: env.SUPABASE_DB_PASSWORD,
  database: env.SUPABASE_DB_NAME,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  console.log("연결 성공:", env.SUPABASE_DB_HOST);
  await client.query(sql);
  console.log("SQL 실행 완료:", file);

  // 생성된 테이블 확인
  const { rows } = await client.query(
    "select tablename from pg_tables where schemaname='public' order by tablename"
  );
  console.log("public 테이블:", rows.map((r) => r.tablename).join(", "));
} catch (e) {
  console.error("실패:", e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
