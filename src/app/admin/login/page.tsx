"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { adminIdToEmail } from "@/lib/admin";

const inputCls =
  "w-full px-4 py-3 rounded-xl border-2 border-slate-400 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: adminIdToEmail(id),
      password,
    });

    if (error) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-lg shadow-blue-900/40 mb-4">
            유
          </div>
          <h1 className="text-xl font-bold text-white">유경원 홈페이지</h1>
          <p className="text-sm text-slate-400 mt-1">관리자 콘솔</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl shadow-black/30 p-7 space-y-4"
        >
          <div>
            <label htmlFor="admin-id" className="block text-sm font-semibold text-slate-700 mb-1.5">
              아이디
            </label>
            <input
              id="admin-id"
              type="text"
              autoComplete="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="admin-pw" className="block text-sm font-semibold text-slate-700 mb-1.5">
              비밀번호
            </label>
            <input
              id="admin-pw"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputCls}
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold shadow-sm shadow-blue-600/25 transition hover:-translate-y-px active:translate-y-0"
          >
            {loading ? "로그인 중…" : "로그인"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          유경원 교수님 전용 관리자 화면입니다.
        </p>
      </div>
    </main>
  );
}
