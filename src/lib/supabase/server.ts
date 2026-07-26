import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버(서버 컴포넌트·서버 액션·라우트 핸들러)용 Supabase 클라이언트 — anon 키 + 쿠키 세션.
 * Next 16에서 cookies()는 async 이므로 await 한다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출되면 set이 무시될 수 있다.
            // 세션 갱신은 proxy(미들웨어)에서 처리하므로 무시해도 안전하다.
          }
        },
      },
    }
  );
}
