import type { Metadata } from "next";
import { getPublications } from "@/lib/content";
import PageHero from "@/components/PageHero";
import ResearchList from "@/components/ResearchList";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "연구",
  description:
    "유경원 교수의 논문·보고서. 가계부채, 가계저축, 인구고령화, 서민금융·신용평가, 소득분배 분야.",
};

// 논문은 DB에서 읽으므로 관리자 저장 후 반영(저장 시 즉시 revalidate).
export const revalidate = 10;

export default async function ResearchPage() {
  const publications = await getPublications();
  return (
    <>
      <PageHero
        kicker="Publications"
        title="연구"
        desc={`1992년부터 발표한 논문·보고서 ${publications.length}편입니다. 주제와 유형으로 필터링할 수 있습니다. 영문 제목과 저널명은 원문 그대로 표기했습니다.`}
      />

      <section className="section-y">
        <div className="container-kwy">
          <ResearchList publications={publications} />
        </div>
      </section>
      <BackToTop />
    </>
  );
}
