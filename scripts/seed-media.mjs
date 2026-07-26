/**
 * media_appearances(언론 인용·인터뷰) 시드. 스키마 적용 후 실행.
 *   node scripts/seed-media.mjs
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

const ITEMS = [
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
    related_topic: "서민금융 · 채무조정",
  },
  {
    headline: "‘불장’ 진정 일단 효과… “규제와 공급 병행 ‘칵테일 요법’ 필요”",
    outlet: "동아일보",
    reporter: null,
    date: "2025.07.07",
    url: "https://www.donga.com/news/Economy/article/all/20250707/131949025/2",
    context:
      "6·27 대출 규제 열흘 뒤 서울 아파트 거래·주택담보대출 동향을 분석한 기사. 대출 규제를 연구한 유경원 교수의 견해를 인용했습니다.",
    quotes: [
      "정부의 대출 규제로 은행들의 대출 태도가 (긴축적으로) 바뀐다고 하더라도 시장의 강력한 수요가 존재할 경우 오히려 대출은 늘어날 수 있다",
      "2019년 규제에도 주담대가 늘어난 것은 주택 시장에 ‘오늘이 가장 싸다’, ‘벼락거지’ 프레임이 확산될 정도로 불안 심리에 편승한 수요가 압도적이었기 때문",
    ],
    related_topic: "가계부채 · 대출규제",
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
    related_topic: "디지털 금융소외",
  },
  {
    headline: "“학자금 갚으면 텅장, 결혼은 다음 생에서나”…20대 더 가난해졌다",
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
    related_topic: "가계부채 · 소득분배",
  },
].map((v, i) => ({ ...v, sort_order: i }));

const admin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const del = await admin.from("media_appearances").delete().neq("id", -1);
if (del.error) throw del.error;
const ins = await admin.from("media_appearances").insert(ITEMS).select();
if (ins.error) throw ins.error;
console.log(`media_appearances 시드 완료: ${ins.data.length}건`);
