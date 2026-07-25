/**
 * 학력 · 경력
 * 출처: 유경원 교수 최신 이력서(2026.07). 학부 공식 페이지의 낡은 항목을 대체·보강.
 */

export type Education = {
  degree: "박사" | "석사" | "학사";
  field: string;
  school: string;
  ym: string; // YYYYMM
  note?: string;
};

export const education: Education[] = [
  { degree: "박사", field: "경제학", school: "Michigan State University", ym: "200308" },
  { degree: "석사", field: "경제학", school: "서강대학교", ym: "199202" },
  { degree: "학사", field: "경제학", school: "서강대학교", ym: "199002", note: "Cum laude" },
];

export type CareerItem = {
  role: string;
  org: string;
  from: string; // YYYY.MM
  to: string | null; // null = 현재
  /** 상근 재직(근무경력) 여부 — 타임라인에서 강조 */
  primary?: boolean;
};

/**
 * 표시 순서: 근무경력(최신순) → 사회봉사·위원(현직 최신순 → 과거).
 * primary=true 는 상근 재직 기관.
 */
export const career: CareerItem[] = [
  // ── 근무경력 ──
  { role: "경제금융학부 교수", org: "상명대학교", from: "2010.09", to: null, primary: true },
  { role: "입학처장 · 교무처장", org: "상명대학교", from: "2016.03", to: "2019.01", primary: true },
  { role: "금융제도실 연구위원 · 실장", org: "보험연구원", from: "2008.05", to: "2010.08", primary: true },
  { role: "금융경제연구원 금융연구실 과장", org: "한국은행", from: "2003.09", to: "2008.05", primary: true },
  { role: "연구원 · 주임연구원", org: "한국개발연구원(KDI)", from: "1992.02", to: "2003.07", primary: true },

  // ── 사회봉사 · 위원 (현직) ──
  { role: "신용정보집중관리위원회 공익위원", org: "한국신용정보원", from: "2026.03", to: null },
  { role: "심사위원회 위원장", org: "새출발기금", from: "2026.03", to: null },
  { role: "「신용평가체계 개편」 T/F 위원", org: "금융위원회", from: "2026.01", to: null },
  { role: "부회장", org: "한국경제연구학회", from: "2026.02", to: null },
  { role: "부회장 · 이사", org: "한국금융소비자학회", from: "2022.03", to: null },
  { role: "자문위원", org: "서민금융진흥원", from: "2025.03", to: null },

  // ── 사회봉사 · 위원 (역임) ──
  { role: "리스크관리위원회 위원", org: "한국자산관리공사", from: "2020.06", to: "2024.06" },
  { role: "「금융연구」 편집위원", org: "한국금융연구원", from: "2020.06", to: "2022.12" },
  { role: "이사", org: "블록체인경영협회", from: "2019.02", to: "2020.12" },
  { role: "정책연구 심의위원", org: "금융위원회", from: "2014.03", to: "2019.12" },
  { role: "이사", org: "한국경제연구학회", from: "2009.01", to: "2020.12" },
  { role: "「한국경제연구」 부편집위원장", org: "한국경제연구학회", from: "2016.03", to: "2018.12" },
  { role: "「소비자문제연구」 편집위원", org: "한국소비자정책교육학회", from: "2013.07", to: "2015.06" },
  { role: "조사연구자문위원회 위원", org: "신용보증재단중앙회", from: "2015.06", to: "2017.02" },
  { role: "학술연구용역 심의위원", org: "한국자산관리공사", from: "2015.03", to: "2017.02" },
  { role: "「보험금융연구」 편집위원장", org: "보험연구원", from: "2009.09", to: "2011.11" },
];

/** 상근 재직 궤적 — 홈/약력 상단 요약용 */
export const trajectory = [
  { org: "한국개발연구원(KDI)", period: "1992–2003", note: "연구원 · 주임연구원" },
  { org: "한국은행", period: "2003–2008", note: "금융경제연구원 과장" },
  { org: "보험연구원", period: "2008–2010", note: "금융제도실 연구위원 · 실장" },
  { org: "상명대학교", period: "2010–현재", note: "경제금융학부 교수 · 교무처장 역임" },
];
