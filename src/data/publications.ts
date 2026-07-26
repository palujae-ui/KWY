/**
 * 논문 · 보고서
 * 출처: 유경원 교수 이력서(2026.07) — 최근 논문(2019~2026)까지 포함.
 *        id 1~55는 학부 페이지 기준(~2018), id 56~는 CV 기준 최신분.
 * 영문 제목/저널명은 번역하지 않고 원문 유지.
 */

export type PubType = "해외저널" | "국내저널" | "보고서" | "저서";

export type Topic =
  | "가계부채"
  | "가계저축·자산"
  | "고령화·연금"
  | "통화·금융정책"
  | "소득분배"
  | "서민금융·신용"
  | "산업·기타";

export type Publication = {
  id: number;
  title: string;
  venue: string;
  /** YYYYMM 또는 YYYY (원문 표기 유지) */
  ym: string;
  type: PubType;
  topics: Topic[];
  /** 수상 논문일 경우 표기 */
  award?: string;
};

export const publications: Publication[] = [
  // ── 최신분 (CV 2026.07 기준, 2019~2026) ──
  { id: 56, title: "중소기업 정책금융의 연체 및 졸업 결정요인 분석", venue: "예산정책연구", ym: "202606", type: "국내저널", topics: ["서민금융·신용", "산업·기타"] },
  { id: 57, title: "자산매입 후 임대 프로그램과 중소기업 성과지표의 연관성 분석: 지원규모의 역할을 중심으로", venue: "중소기업금융연구", ym: "202512", type: "국내저널", topics: ["서민금융·신용", "산업·기타"] },
  { id: 58, title: "가계부채 규제가 금융안정성과 소득분배에 미치는 영향", venue: "소비자학연구", ym: "202412", type: "국내저널", topics: ["가계부채", "소득분배"], award: "한국소비자학회 우수논문상" },
  { id: 59, title: "민간신용과 소득분배 관계에 관한 실증연구: 가계부채와 소득 불평등 관계를 중심으로", venue: "미래성장연구", ym: "202412", type: "국내저널", topics: ["가계부채", "소득분배"] },
  { id: 60, title: "디지털 금융확산의 영향과 디지털 금융소외 원인 분석", venue: "소비자정책교육연구", ym: "202409", type: "국내저널", topics: ["서민금융·신용"], award: "소비자정책교육학회 최우수논문상" },
  { id: 61, title: "가계부채 관련 규제가 은행 대출행태에 미치는 영향 분석", venue: "보험금융연구", ym: "202409", type: "국내저널", topics: ["가계부채", "통화·금융정책"] },
  { id: 62, title: "위험회피도와 금리민감도가 금융소비자의 의사결정에 미치는 영향", venue: "Financial Planning Review", ym: "202402", type: "국내저널", topics: ["가계저축·자산"], award: "한국FP학회 우수논문상" },
  { id: 63, title: "세대간 소득·자산 불평등 추이: 20~30대 청년세대를 중심으로", venue: "한국의 사회동향 2023 (통계개발원)", ym: "202312", type: "보고서", topics: ["소득분배"] },
  { id: 64, title: "공적개발원조(ODA)와 해외직접투자(FDI)가 개도국 경제성장에 미치는 영향에 대한 실증연구", venue: "국제개발협력연구", ym: "202212", type: "국내저널", topics: ["산업·기타"] },
  { id: 65, title: "은행 지점망 축소의 영향과 금융소외 발생원인에 관한 실증연구", venue: "소비자정책교육연구", ym: "202212", type: "국내저널", topics: ["서민금융·신용"], award: "소비자정책교육학회 우수논문상" },
  { id: 66, title: "인터넷 검색자료를 이용한 가계대출 수요의 분석", venue: "소비자정책교육연구", ym: "202203", type: "국내저널", topics: ["가계부채"] },
  { id: 67, title: "코로나19 확산 전후 소득불평등의 변화", venue: "한국의 사회동향 2021 (통계개발원)", ym: "202112", type: "보고서", topics: ["소득분배"] },
  { id: 68, title: "포털 검색어 자료를 이용한 개인파산 판단지표의 개발", venue: "소비자정책교육연구", ym: "202109", type: "국내저널", topics: ["서민금융·신용"] },
  { id: 69, title: "부채의 유입과 유출을 이용한 가계부채 변화요인과 영향 연구: 차주별 신용패널 데이터를 중심으로", venue: "보험금융연구", ym: "202105", type: "국내저널", topics: ["가계부채"] },
  { id: 70, title: "Is Imitation Bad for the Production of Creative Works?", venue: "Review of Network Economics", ym: "202101", type: "해외저널", topics: ["산업·기타"] },
  { id: 71, title: "과거 경제위기와 코로나19 확산기의 소비지출 패턴 비교", venue: "한국의 사회동향 2020 (통계개발원)", ym: "202012", type: "보고서", topics: ["가계저축·자산"] },
  { id: 72, title: "중·고령자가구의 은퇴전후 자산보유 행태 분석", venue: "소비자정책교육연구", ym: "202012", type: "국내저널", topics: ["고령화·연금", "가계저축·자산"] },
  { id: 73, title: "Financial Inclusion Through Fintech in the Digital Economy", venue: "APEC Study Series 20-03, KIEP", ym: "2020", type: "보고서", topics: ["서민금융·신용"] },
  { id: 74, title: "빅데이터를 활용한 개인회생 및 개인파산 실적 예측", venue: "소비자학연구", ym: "202003", type: "국내저널", topics: ["서민금융·신용"] },
  { id: 75, title: "The Utility of Information Security Training and Education on Cybersecurity Incidents: An Empirical Evidence", venue: "Information Systems Frontiers", ym: "201912", type: "해외저널", topics: ["산업·기타"] },
  { id: 76, title: "지역별 상속의향 차이에 관한 연구", venue: "서울도시연구", ym: "201903", type: "국내저널", topics: ["소득분배", "가계저축·자산"] },
  { id: 77, title: "인구구조 고령화의 가계경제 영향 (『고령화가 공적연금과 국민경제에 미치는 영향: 한국과 일본 비교연구』 제4장)", venue: "국민연금연구원", ym: "201812", type: "보고서", topics: ["고령화·연금"] },

  // ── 학부 페이지 기준 (~2018) ──
  { id: 1, title: "The Effect of Piracy and Digital Rights Management on Vertically Related Content Industries", venue: "Review of Network Economics", ym: "201806", type: "해외저널", topics: ["산업·기타"] },
  { id: 2, title: "CCR-CUSUM 검정을 활용한 이자율기간구조에 대한 실증분석", venue: "금융연구", ym: "201803", type: "국내저널", topics: ["통화·금융정책"] },
  { id: 3, title: "우리나라 가계의 동태적 부채보유 행태에 대한 분석", venue: "통계연구", ym: "201712", type: "국내저널", topics: ["가계부채"] },
  { id: 4, title: "가계부채와 자산분배", venue: "한국경제연구", ym: "201709", type: "국내저널", topics: ["가계부채", "소득분배"] },
  { id: 5, title: "국민연금이 저축에 미치는 영향 연구: 미시자료 분석을 중심으로", venue: "한국경제연구", ym: "201703", type: "국내저널", topics: ["가계저축·자산", "고령화·연금"] },
  { id: 6, title: "계층별 가계부채와 상환부담의 변화", venue: "통계청 통계개발원", ym: "201612", type: "보고서", topics: ["가계부채", "소득분배"] },
  { id: 7, title: "가계부채의 리스크 요인 분석: 경기도 지역을 중심으로", venue: "한국경제연구", ym: "201609", type: "국내저널", topics: ["가계부채"] },
  { id: 8, title: "은퇴가 중·고령자 가구의 소비지출 변화에 미치는 영향", venue: "소비자정책교육연구", ym: "201606", type: "국내저널", topics: ["고령화·연금"] },
  { id: 9, title: "미소금융 사업의 연체 결정요인 및 효율성 분석", venue: "금융안정연구", ym: "201606", type: "국내저널", topics: ["서민금융·신용"] },
  { id: 10, title: "조세 및 재정지출 정책의 소득재분배 효과 분석", venue: "응용경제", ym: "201606", type: "국내저널", topics: ["소득분배"] },
  { id: 11, title: "소득분위별 자산의 분포와 구성", venue: "통계청 통계개발원", ym: "201512", type: "보고서", topics: ["소득분배", "가계저축·자산"] },
  { id: 12, title: "통화정책 효과의 지역적 차이에 대한 분석", venue: "보험금융연구", ym: "201511", type: "국내저널", topics: ["통화·금융정책"] },
  { id: 13, title: "개인 채무조정 과정에서 채무자와 채권자의 전략적 행동에 대한 분석", venue: "소비자문제연구", ym: "201508", type: "국내저널", topics: ["서민금융·신용", "가계부채"] },
  { id: 14, title: "Economic modeling of innovation in the creative industries and its implications", venue: "Technological Forecasting and Social Change", ym: "201507", type: "해외저널", topics: ["산업·기타"] },
  { id: 15, title: "미국의 대규모 주택담보대출 부실화에 대한 정책 대응과 시사점", venue: "캠코리뷰", ym: "201506", type: "보고서", topics: ["가계부채", "통화·금융정책"] },
  { id: 16, title: "가계부채 확대가 실물부문 리스크에 미치는 영향", venue: "한국경제의 분석", ym: "201504", type: "국내저널", topics: ["가계부채"] },
  { id: 17, title: "창조경제 활성화를 위한 금융지원 방안에 대한 연구: 신용보증제도를 중심으로", venue: "벤처창업연구", ym: "201412", type: "국내저널", topics: ["서민금융·신용"] },
  { id: 18, title: "제6장 초저출산·초고령화와 금융시장", venue: "한국보건사회연구원", ym: "201412", type: "보고서", topics: ["고령화·연금"] },
  { id: 19, title: "가계부채의 리스크요인과 정책 대응", venue: "캠코리뷰: 금융과 국가자산", ym: "201403", type: "보고서", topics: ["가계부채"] },
  { id: 20, title: "Working Paper No.180", venue: "Institute of Comparative Economic Studies, Hosei University", ym: "2014", type: "보고서", topics: ["산업·기타"] },
  { id: 21, title: "인구 고령화의 경제적 영향 분석 및 고령화 대응지수 개발", venue: "한국보건사회연구원", ym: "201212", type: "보고서", topics: ["고령화·연금"] },
  { id: 22, title: "은퇴가구의 경제행태 분석", venue: "보험연구원", ym: "201209", type: "보고서", topics: ["고령화·연금"] },
  { id: 23, title: "가계부채의 확대와 대출제약", venue: "경제분석", ym: "201203", type: "국내저널", topics: ["가계부채"] },
  { id: 24, title: "Does Household Debt in Korea Constitute Another Ticking Bomb of the Global Financial Crisis?", venue: "The Aoyama Journal of International Politics, Economics and Communication", ym: "201201", type: "해외저널", topics: ["가계부채"] },
  { id: 25, title: "인구고령화와 가계의 금융자산선택: 이론 및 실증분석", venue: "한국경제연구", ym: "201103", type: "국내저널", topics: ["고령화·연금", "가계저축·자산"] },
  { id: 26, title: "한국의 가계저축률 하락 요인에 관한 연구", venue: "유라시아연구", ym: "201103", type: "국내저널", topics: ["가계저축·자산"] },
  { id: 27, title: "교육비 부담이 가계 저축 및 소비행태에 미치는 영향", venue: "소비자학연구", ym: "201012", type: "국내저널", topics: ["가계저축·자산"] },
  { id: 28, title: "가계부채와 부채원인", venue: "통계개발원", ym: "201012", type: "보고서", topics: ["가계부채"] },
  { id: 29, title: "가구패널자료 접속을 통한 외환위기 전후 유동성제약 변화 연구", venue: "응용경제", ym: "201009", type: "국내저널", topics: ["가계저축·자산"] },
  { id: 30, title: "글로벌 금융위기 이후 보험산업 발전방안에 관한 연구", venue: "보험연구원", ym: "200912", type: "보고서", topics: ["통화·금융정책"] },
  { id: 31, title: "가계부채 문제에 관한 분석: 미시자료를 중심으로", venue: "경제분석", ym: "200912", type: "국내저널", topics: ["가계부채"] },
  { id: 32, title: "기후변화와 가계의 위험관리", venue: "보험금융연구", ym: "200903", type: "국내저널", topics: ["산업·기타"] },
  { id: 33, title: "현 금융위기진단과 위기극복을 위한 정책제언", venue: "보험연구원", ym: "200902", type: "보고서", topics: ["통화·금융정책"] },
  { id: 34, title: "인구고령화가 인적자본 투자 및 금융시장에 미치는 영향", venue: "보험개발연구", ym: "200811", type: "국내저널", topics: ["고령화·연금"] },
  { id: 35, title: "소액서민금융재단의 소액보험사업 발전방안", venue: "보험연구원", ym: "200809", type: "보고서", topics: ["서민금융·신용"] },
  { id: 36, title: "우리나라 가계저축률 격차의 발생원인 분석", venue: "한국경제연구", ym: "200809", type: "국내저널", topics: ["가계저축·자산"] },
  { id: 37, title: "Internet, Inequality, and Growth", venue: "Journal of Policy Modeling", ym: "200806", type: "해외저널", topics: ["소득분배", "산업·기타"] },
  { id: 38, title: "한국 금융산업에 대한 진단과 과제", venue: "금융경제연구원", ym: "200802", type: "보고서", topics: ["통화·금융정책"] },
  { id: 39, title: "경제구조 변화와 지속성장 과제", venue: "금융경제연구원", ym: "200801", type: "보고서", topics: ["산업·기타"] },
  { id: 40, title: "금융환경변화에 따른 중소기업금융 발전방안", venue: "중소기업연구원", ym: "200712", type: "보고서", topics: ["서민금융·신용"] },
  { id: 41, title: "Precautionary Behavior, Migrant Networks and Household Consumption Decisions: An Empirical Analysis Using Household Panel Data from Rural China", venue: "Review of Economics and Statistics", ym: "200708", type: "해외저널", topics: ["가계저축·자산"] },
  { id: 42, title: "국가별 패널자료를 이용한 자살률 결정요인 분석", venue: "한국경제연구", ym: "200706", type: "국내저널", topics: ["산업·기타"] },
  { id: 43, title: "우리나라 개인파산의 결정요인과 시사점", venue: "경제분석", ym: "200609", type: "국내저널", topics: ["서민금융·신용", "가계부채"] },
  { id: 44, title: "Housing and Mortgage Markets in Korea", venue: "Housing and Mortgage Markets in the SEACEN Countries", ym: "2006", type: "보고서", topics: ["가계부채"] },
  { id: 45, title: "소기업·소상공인의 보증실적 성과측정 및 경제·사회적 효과 제고 방안", venue: "한국중소기업학회", ym: "200511", type: "보고서", topics: ["서민금융·신용"] },
  { id: 46, title: "Empirical Analysis of Precautionary Portfolio Allocation: Evidence for Korea", venue: "Economic Papers", ym: "200508", type: "해외저널", topics: ["가계저축·자산"] },
  { id: 47, title: "위험분담(risk-sharing)제도 구축: 보증제도를 중심으로", venue: "한국은행", ym: "200506", type: "보고서", topics: ["서민금융·신용"] },
  { id: 48, title: "금융시장에서의 모럴해저드 현상과 정책과제", venue: "금융경제총서", ym: "200412", type: "보고서", topics: ["통화·금융정책"] },
  { id: 49, title: "우리나라 가계의 예비적 자산선택에 관한 실증분석", venue: "경제분석", ym: "200409", type: "국내저널", topics: ["가계저축·자산"] },
  { id: 50, title: "Cross-country Analysis of Household Responses to Adult Mortality in Rural Sub-Saharan Africa: Implications for HIV/AIDS Migration and Rural Development Policies", venue: "International Development Working Paper", ym: "200407", type: "보고서", topics: ["산업·기타"] },
  { id: 51, title: "Rural-urban Migration Decisions in China: Evidence from Rural Household Panel Data", venue: "대외경제연구", ym: "200406", type: "국내저널", topics: ["산업·기타"] },
  { id: 52, title: "Emergence of Wealth Inequality in China: Evidence from Rural Household Survey, 1986-2000", venue: "대외경제연구", ym: "200312", type: "국내저널", topics: ["소득분배"] },
  { id: 53, title: "사회개발지출의 재원조달방안", venue: "한국개발연구원", ym: "1997", type: "보고서", topics: ["소득분배"] },
  { id: 54, title: "재정의 거시경제적 효과와 정책과제", venue: "한국개발연구원", ym: "1994", type: "보고서", topics: ["통화·금융정책"] },
  { id: 55, title: "미국의 예산과정과 재정운용", venue: "한국개발연구원", ym: "1992", type: "보고서", topics: ["통화·금융정책"] },
];

export const ALL_TOPICS: Topic[] = [
  "가계부채",
  "가계저축·자산",
  "고령화·연금",
  "통화·금융정책",
  "소득분배",
  "서민금융·신용",
  "산업·기타",
];

export const ALL_TYPES: PubType[] = ["해외저널", "국내저널", "보고서"];

/** "201803" → 2018 */
export const yearOf = (ym: string): number => Number(ym.slice(0, 4));

/** 정렬용 숫자 키 — "201803" → 201803, "2014"(연도만) → 201400 (연·월 모두 반영) */
export const ymNum = (ym: string): number =>
  Number(ym.length >= 6 ? ym.slice(0, 6) : ym.slice(0, 4) + "00");

/** "201803" → "2018.03", "2014" → "2014" */
export const formatYm = (ym: string): string =>
  ym.length === 6 ? `${ym.slice(0, 4)}.${ym.slice(4)}` : ym;

/** 홈 대표 연구 — 최근 수상작 + 해외 주요 저널 */
export const featuredIds = [58, 60, 62, 70, 41, 37];
