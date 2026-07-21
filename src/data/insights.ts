/**
 * 정책 활동 · 저서 · 기고문
 *
 * ⚠️ 원칙: 모든 항목은 1차 출처(보도자료·발행처)를 명시한다. 출처 없는 이력은 등재하지 않는다.
 */

export type PolicyActivity = {
  title: string;
  role: string;
  org: string;
  date: string;
  body: string[];
  /** 보도자료 등 1차 출처 */
  source: { label: string; url: string };
  quote?: string;
};

export const policyActivities: PolicyActivity[] = [
  {
    title: "금융위원회 「신용평가체계 개편 T/F」",
    role: "TF위원",
    org: "금융위원회",
    date: "2026",
    body: [
      "금융위원회는 2026년 4월 9일 제3차 「신용평가체계 개편 T/F」 회의를 열고 「소상공인 신용평가체계 도입방안」을 발표했습니다. 유경원 교수는 학계 전문가로 구성된 TF위원으로 참여하고 있습니다.",
      "이 T/F가 다루는 소상공인 특화 신용평가체계(SCB)는 금융이력이 부족한 소상공인이 기존 신용평가 방식에서 구조적으로 불리하게 평가되는 문제를 다룹니다. 유경원 교수가 미소금융 연체 결정요인(2016), 개인 채무조정 과정의 전략적 행동(2015), 신용보증제도(2014), 소기업·소상공인 보증실적(2005) 등으로 30년간 축적해 온 서민금융·신용 연구와 직접 맞닿아 있는 주제입니다.",
    ],
    quote:
      "(TF위원) 최대우 한국외대교수·유경원 상명대교수·최현자 서울대교수·최경진 가천대교수, 문영배 前나이스평가정보연구소장, 정성구 법무법인 세종 변호사, 이수진 금융연 금융소비자실장, 금감원·신정원 등",
    source: {
      label: "금융위원회 보도자료 (2026.4.9)",
      url: "https://www.fsc.go.kr/no010101/86674",
    },
  },
];

export type Editorship = { role: string; journal: string; period: string };

/** 학술지 편집 활동 — career.ts와 중복되지만 이 페이지에서 별도 강조 */
export const editorships: Editorship[] = [
  { role: "편집위원", journal: "금융연구", period: "2017.09 ~ 현재" },
  { role: "부편집위원장", journal: "한국경제연구", period: "2016.03 ~ 현재" },
  { role: "심의위원", journal: "금융위원회 정책연구", period: "2014.03 ~ 현재" },
  { role: "이사", journal: "한국경제연구학회", period: "2009.01 ~ 현재" },
  { role: "편집위원", journal: "소비자문제연구", period: "2013.07 ~ 2015.06" },
  { role: "편집위원장", journal: "보험금융연구", period: "2009.09 ~ 2011.12" },
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
    publisher: "북오션",
    date: "2014.01.20",
  },
];

export type Column = {
  title: string;
  outlet: string;
  date: string;
  url?: string;
};

/**
 * 언론 기고 · 칼럼
 * TODO: 현재 공개 검색으로 확정된 목록이 없어 비워 둠.
 *       교수님께 목록을 받으면 아래 배열에 추가하면 페이지가 자동으로 섹션을 노출한다.
 */
export const columns: Column[] = [];

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
  /** 기사 주제 한 줄 */
  context: string;
  /** 기사에 실린 발언 (원문 그대로) */
  quotes: string[];
  /** 이 주제와 맞닿은 본인 연구 */
  relatedTopic?: string;
};

export const mediaAppearances: MediaAppearance[] = [
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
