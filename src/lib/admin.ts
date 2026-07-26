/**
 * 관리자 로그인 ID ↔ Supabase Auth 이메일 매핑.
 * 교수님은 "palujae" 같은 아이디만 입력하고, 내부적으로 이메일로 변환한다.
 * (Supabase Auth는 이메일 형식을 요구하므로)
 */
export const ADMIN_DOMAIN = "palujae-ui.com";

export function adminIdToEmail(id: string): string {
  return `${id.trim().toLowerCase()}@${ADMIN_DOMAIN}`;
}
