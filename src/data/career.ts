/**
 * 학력 · 경력
 * 출처: 상명대학교 경제금융학부 교수진 페이지 (원문 표기 유지)
 */

export type Education = {
  degree: "박사" | "석사" | "학사";
  field: string;
  school: string;
  ym: string; // YYYYMM
};

export const education: Education[] = [
  { degree: "박사", field: "Economics", school: "Michigan State University", ym: "200308" },
  { degree: "석사", field: "경제학과", school: "서강대학교", ym: "199202" },
  { degree: "학사", field: "경제학과", school: "서강대학교", ym: "199002" },
];

export type CareerItem = {
  role: string;
  org: string;
  from: string; // YYYY.MM
  to: string | null; // null = 현재
  /** 상근 재직 기관 여부 — 타임라인에서 강조 */
  primary?: boolean;
};

/** 원문 순서(최신순) 유지 */
export const career: CareerItem[] = [
  { role: "편집위원", org: "금융연구", from: "2017.09", to: null },
  { role: "부편집위원장", org: "한국경제연구", from: "2016.03", to: null },
  { role: "내부평가위원", org: "한국감정원", from: "2015.11", to: null },
  { role: "조사연구자문위원회 위원", org: "신용보증재단중앙회", from: "2015.06", to: "2017.02" },
  { role: "심의위원", org: "한국자산관리공사 학술연구용역", from: "2015.03", to: "2017.02" },
  { role: "평가위원", org: "국무조정실 국정과제 평가지원단", from: "2014", to: "2015" },
  { role: "심의위원", org: "금융위원회 정책연구", from: "2014.03", to: null },
  { role: "편집위원", org: "소비자문제연구", from: "2013.07", to: "2015.06" },
  { role: "편집위원장", org: "보험금융연구", from: "2009.09", to: "2011.12" },
  { role: "이사", org: "한국경제연구학회", from: "2009.01", to: null },
  { role: "연구위원", org: "보험연구원", from: "2008.05", to: "2010.09", primary: true },
  { role: "과장", org: "한국은행", from: "2003.09", to: "2008.05", primary: true },
  { role: "주임연구원 / 연구원", org: "한국개발연구원(KDI)", from: "1992.02", to: "2003.07", primary: true },
];

/**
 * 상근 재직 궤적 — 홈/약력 상단 요약용
 * ※ 상명대 부임 연도는 학부 공식 프로필에 표기가 없어 보험연구원 퇴직(2010.09) 직후로 표기.
 *   정확한 연도를 확인하면 아래 period 값을 수정할 것.
 */
export const trajectory = [
  { org: "한국개발연구원(KDI)", period: "1992–2003", note: "연구원 · 주임연구원" },
  { org: "한국은행", period: "2003–2008", note: "과장" },
  { org: "보험연구원", period: "2008–2010", note: "연구위원" },
  { org: "상명대학교", period: "2010–현재", note: "경제금융학부 교수" },
];
