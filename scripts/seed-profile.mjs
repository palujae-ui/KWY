/**
 * profile 단일 행(id=1) 시드. 스키마 적용 후 실행.
 *   node scripts/seed-profile.mjs
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

const row = {
  id: 1,
  name_ko: "유경원",
  name_en: "Kyeongwon Yoo",
  name_hanja: "劉庚遠",
  affiliation: "상명대학교 경영경제대학 경제금융학부",
  affiliation_en: "School of Economics and Finance, Sangmyung University",
  title: "교수",
  tagline: "한국 가계의 빚과 저축을 데이터로 추적해 온 경제학자",
  intro: [
    "유경원 교수는 한국개발연구원(KDI)에서 연구자로 출발해 한국은행 금융경제연구원과 보험연구원을 거쳐 2010년부터 상명대학교 경제금융학부 교수로 재직 중이며, 상명대 입학처장·교무처장을 역임했습니다.",
    "가계부채와 가계저축, 인구 고령화가 금융시장에 미치는 영향, 그리고 서민금융·신용평가 체계를 주제로 다수의 논문을 발표했습니다. 연구의 상당수는 미시 가구 패널 자료를 이용한 실증분석으로, 통계에 잡히지 않는 가계의 실제 행동을 추적하는 데 초점을 맞춰 왔습니다.",
    "정책 현장과 학술 연구 양쪽에 걸친 이력을 바탕으로 새출발기금 심사위원회 위원장, 한국신용정보원 신용정보집중관리위원회 공익위원, 금융위원회 「신용평가체계 개편」 T/F 위원으로 활동하고 있으며, 한국경제연구학회·한국금융소비자학회 부회장을 맡고 있습니다.",
  ],
  email: "kwyoo@smu.ac.kr",
  phone: "02-2287-5039",
  office: "(O관) 제1교수회관 O314",
  research_areas: [
    { title: "가계부채", topic: "가계부채", desc: "부채 보유의 동태적 행태, 대출제약, 상환부담의 계층별 분포, 실물부문으로의 리스크 전이" },
    { title: "가계저축·자산선택", topic: "가계저축·자산", desc: "예비적 저축 동기, 저축률 하락 요인, 가계의 금융자산 포트폴리오 결정" },
    { title: "인구 고령화와 금융", topic: "고령화·연금", desc: "초저출산·고령화가 인적자본 투자와 금융시장 구조에 미치는 영향, 은퇴가구의 경제행태" },
    { title: "서민금융·신용평가", topic: "서민금융·신용", desc: "미소금융·개인파산·채무조정, 신용보증제도, 소상공인 신용평가, 디지털 금융소외" },
  ],
};

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { error } = await admin.from("profile").upsert(row, { onConflict: "id" });
if (error) throw error;
console.log("profile 시드 완료 (id=1)");
