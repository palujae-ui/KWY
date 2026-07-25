/**
 * 정책 활동 · 경제 인사이트(기고) · 언론 인용 · 학술지 편집 · 저서
 *
 * ⚠️ 원칙: 언론 인용·기고는 1차 출처(원문 URL)를, 정책 이력은 보도자료 또는 본인 이력서를 명시한다.
 * 출처: 언론사 원문 + 유경원 교수 이력서(2026.07).
 */

export type PolicyActivity = {
  title: string;
  role: string;
  org: string;
  date: string;
  body: string[];
  source: { label: string; url?: string };
  quote?: string;
};

export const policyActivities: PolicyActivity[] = [
  {
    title: "금융위원회 「신용평가체계 개편 T/F」",
    role: "TF위원 (2026.1~)",
    org: "금융위원회",
    date: "2026",
    body: [
      "금융위원회는 2026년 4월 9일 제3차 「신용평가체계 개편 T/F」 회의를 열고 「소상공인 신용평가체계 도입방안」을 발표했습니다. 유경원 교수는 학계 전문가로 구성된 TF위원으로 참여하고 있습니다.",
      "이 T/F가 다루는 소상공인 특화 신용평가체계(SCB)는 금융이력이 부족한 소상공인이 기존 신용평가 방식에서 구조적으로 불리하게 평가되는 문제를 다룹니다. 유경원 교수가 미소금융 연체 결정요인(2016), 개인 채무조정 과정의 전략적 행동(2015), 신용보증제도(2014) 등으로 축적해 온 서민금융·신용 연구와 직접 맞닿아 있는 주제입니다.",
    ],
    quote:
      "(TF위원) 최대우 한국외대교수·유경원 상명대교수·최현자 서울대교수·최경진 가천대교수, 문영배 前나이스평가정보연구소장, 정성구 법무법인 세종 변호사, 이수진 금융연 금융소비자실장, 금감원·신정원 등",
    source: {
      label: "금융위원회 보도자료 (2026.4.9)",
      url: "https://www.fsc.go.kr/no010101/86674",
    },
  },
  {
    title: "새출발기금 심사위원회",
    role: "위원장 (2026.3~)",
    org: "한국자산관리공사 · 새출발기금",
    date: "2026",
    body: [
      "새출발기금은 코로나19 피해 소상공인·자영업자의 채무를 조정하는 정부 채무조정 프로그램입니다. 유경원 교수는 심사위원회 위원장을 맡아 채무조정 심사 기준과 운영을 총괄하고 있습니다.",
      "개인파산·채무조정의 결정요인(2006, 2015)과 서민금융 효율성(2016)에 대한 그의 실증연구가 실제 채무조정 정책의 심사 현장으로 이어진 사례입니다.",
    ],
    source: { label: "유경원 교수 이력서 (2026.07)" },
  },
];

export type Editorship = { role: string; journal: string; period: string };

/** 학술지 편집 활동 — 출처: 이력서(2026.07) */
export const editorships: Editorship[] = [
  { role: "편집위원", journal: "금융연구", period: "2020.06 ~ 2022.12" },
  { role: "부편집위원장", journal: "한국경제연구", period: "2016.03 ~ 2018.12" },
  { role: "편집위원", journal: "소비자문제연구", period: "2013.07 ~ 2015.06" },
  { role: "편집위원장", journal: "보험금융연구", period: "2009.09 ~ 2011.11" },
];

export type Book = {
  title: string;
  publisher: string;
  date: string;
  note?: string;
};

export const books: Book[] = [
  {
    title: "한국경제, 새로운 도약을 꿈꾸다",
    publisher: "한국경제연구원",
    date: "2014.01",
    note: "김미애 외 공저",
  },
];

/**
 * 경제 인사이트 — 기고 칼럼
 * 유경원 교수는 2020년부터 내일신문(석간) 「경제시평」에 매달 경제 칼럼을 연재하고 있다.
 * 아래는 그 일부(2025.03~2026.04). 게재일 내림차순.
 */
export type Column = {
  title: string;
  outlet: string;
  date: string; // YYYY.MM.DD
  url?: string;
};

export const columns: Column[] = [
  { title: "포용금융, ‘시혜’에서 ‘시장’으로", outlet: "내일신문 「경제시평」", date: "2026.04.03", url: "https://www.naeil.com/news/printP/583836" },
  { title: "정책금융, 관행 넘어 과학으로", outlet: "내일신문 「경제시평」", date: "2026.03.12", url: "https://www.naeil.com/news/printP/580969" },
  { title: "신용의 위기, 신호가 소음이 될 때", outlet: "내일신문 「경제시평」", date: "2026.02.04", url: "https://www.naeil.com/news/printP/577028" },
  { title: "K-컬처의 비상과 1%대 저성장", outlet: "내일신문 「경제시평」", date: "2026.01.06", url: "https://www.naeil.com/news/printP/573285" },
  { title: "금융포용이 만든 역설", outlet: "내일신문 「경제시평」", date: "2025.12.03", url: "https://www.naeil.com/news/printP/569604" },
  { title: "암호화폐의 명과 암", outlet: "내일신문 「경제시평」", date: "2025.11.05", url: "https://www.naeil.com/news/printP/566527" },
  { title: "최저치 경신한 구인배율 충격", outlet: "내일신문 「경제시평」", date: "2025.10.10", url: "https://www.naeil.com/news/printP/563546" },
  { title: "‘신디지털 디바이드’를 우려한다", outlet: "내일신문 「경제시평」", date: "2025.09.03", url: "https://www.naeil.com/news/printP/559930" },
  { title: "관세협상의 그림자와 빛", outlet: "내일신문 「경제시평」", date: "2025.08.06", url: "https://www.naeil.com/news/printP/557137" },
  { title: "모두가 패자가 되는 사회", outlet: "내일신문 「경제시평」", date: "2025.07.02", url: "https://www.naeil.com/news/printP/553100" },
  { title: "‘사실’에 기반한 정책을 기대한다", outlet: "내일신문 「경제시평」", date: "2025.06.05", url: "https://www.naeil.com/news/printP/550237" },
  { title: "‘다크 패턴’ 디지털 유혹의 기술", outlet: "내일신문 「경제시평」", date: "2025.05.09", url: "https://www.naeil.com/news/printP/547349" },
  { title: "청년에게 전가되는 불공정한 미래", outlet: "내일신문 「경제시평」", date: "2025.04.04", url: "https://www.naeil.com/news/printP/543559" },
  { title: "한은의 금리인하, 우려와 대응", outlet: "내일신문 「경제시평」", date: "2025.03.07", url: "https://www.naeil.com/news/printP/540258" },
];

/**
 * 언론 인용 · 인터뷰
 * 기자가 전문가로 취재·인용한 기사. 발언은 기사 원문 그대로 인용한다.
 */
export type MediaAppearance = {
  headline: string;
  outlet: string;
  reporter?: string;
  date: string;
  url: string;
  context: string;
  quotes: string[];
  relatedTopic?: string;
};

export const mediaAppearances: MediaAppearance[] = [
  {
    headline: "역대 최대 규모 빚 탕감 논란… 침체된 경제와 구멍 난 곳간 사이",
    outlet: "시사저널",
    reporter: "오유진 기자",
    date: "2025.06.27",
    url: "https://www.sisajournal.com/news/articleView.html?idxno=337613",
    context:
      "정부의 대규모 채무조정(빚 탕감) 정책을 둘러싼 논쟁을 다룬 기사. 유경원 교수가 보고서를 통해 제기한 정책 설계상의 문제를 인용했습니다.",
    quotes: [
      "정책의 목적에 부합한다고 해도 정책 목표와 수단, 실행 방법과 시기 설정에 있어 충분한 논의가 이뤄지지 못해 세대 간, 직종 간, 젠더 간 불필요한 갈등만 양산됐다",
    ],
    relatedTopic: "서민금융 · 채무조정",
  },
  {
    headline: "‘불장’ 진정 일단 효과… “규제와 공급 병행 ‘칵테일 요법’ 필요”",
    outlet: "동아일보",
    date: "2025.07.07",
    url: "https://www.donga.com/news/Economy/article/all/20250707/131949025/2",
    context:
      "6·27 대출 규제 열흘 뒤 서울 아파트 거래·주택담보대출 동향을 분석한 기사. 대출 규제를 연구한 유경원 교수의 견해를 인용했습니다.",
    quotes: [
      "정부의 대출 규제로 은행들의 대출 태도가 (긴축적으로) 바뀐다고 하더라도 시장의 강력한 수요가 존재할 경우 오히려 대출은 늘어날 수 있다",
      "2019년 규제에도 주담대가 늘어난 것은 주택 시장에 ‘오늘이 가장 싸다’, ‘벼락거지’ 프레임이 확산될 정도로 불안 심리에 편승한 수요가 압도적이었기 때문",
    ],
    relatedTopic: "가계부채 · 대출규제",
  },
  {
    headline: "비행기까지 타고 온다고?…인뱅 대면 고객센터는 왜 ‘서울’에만 있을까",
    outlet: "경향신문",
    reporter: "배재흥 기자",
    date: "2025.09.15",
    url: "https://www.khan.co.kr/article/202509150600151",
    context:
      "인터넷전문은행의 대면 고객센터가 수도권에 집중된 문제를 다룬 기사. 디지털 금융소외를 연구한 유경원 교수의 견해를 인용했습니다.",
    quotes: [
      "노인 등 취약계층도 더 쉽게 접근할 수 있는 디지털금융 서비스를 개발하려는 노력이 더 필요해 보인다",
    ],
    relatedTopic: "디지털 금융소외",
  },
  {
    headline:
      "“학자금 갚으면 텅장, 결혼은 다음 생에서나”…20대 더 가난해졌다",
    outlet: "매일경제",
    reporter: "문지웅 기자",
    date: "2023.12.15",
    url: "https://www.mk.co.kr/news/economy/10899877",
    context:
      "통계청 통계개발원·서울대 한국사회과학자료원 『한국의 사회동향 2023』을 분석한 기사. 20대 이하 청년층의 부채가 4년 새 93.6% 급증한 반면 소득은 전 연령대 중 유일하게 감소한 현상을 다뤘습니다.",
    quotes: [
      "코로나19이후 특히 20대 연령층에서 근로소득을 중심으로 한 소득 충격이 크게 나타나 상대적으로 이들 계층의 분배 여건이 악화됐다",
      "30대와 20대 이하는 가장 낮은 순자산을 형성하고 있다. 청년세대의 부채가 소득이나 자산의 증가 속도에 비해 매우 빠르게 증가하면서 재무 건전성 역시 취약한 상태에 놓여 있는 것",
    ],
    relatedTopic: "가계부채 · 소득분배",
  },
];
