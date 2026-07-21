import type { Metadata } from "next";
import { publications } from "@/data/publications";
import PageHero from "@/components/PageHero";
import ResearchList from "@/components/ResearchList";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "연구",
  description:
    "유경원 교수의 논문·보고서 55편. 가계부채, 가계저축, 인구고령화, 서민금융·신용평가, 소득분배 분야.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        kicker="Publications"
        title="연구"
        desc={`1992년부터 발표한 논문·보고서 ${publications.length}편입니다. 주제와 유형으로 필터링할 수 있습니다. 영문 제목과 저널명은 원문 그대로 표기했습니다.`}
      />

      <section className="section-y">
        <div className="container-kwy">
          <ResearchList />
        </div>
      </section>
      <BackToTop />
    </>
  );
}
