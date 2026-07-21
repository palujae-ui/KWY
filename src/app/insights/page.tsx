import type { Metadata } from "next";
import {
  policyActivities,
  editorships,
  books,
  columns,
  mediaAppearances,
} from "@/data/insights";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "정책·기고",
  description:
    "금융위원회 신용평가체계 개편 T/F 위원 활동, 학술지 편집 활동, 저서, 언론 인용 및 기고.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        kicker="Policy & Writing"
        title="정책·기고"
        desc="정책 자문 활동과 학술지 편집, 저술 활동입니다. 모든 항목은 1차 출처를 함께 표기했습니다."
      />

      {/* 정책 활동 */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle kicker="Policy" title="정책 자문" />

          <div className="space-y-8">
            {policyActivities.map((a) => (
              <article
                key={a.title}
                className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    {a.org}
                  </span>
                  <span className="num text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {a.date}
                  </span>
                </div>

                <h3 className="font-extrabold text-2xl md:text-3xl text-slate-900 leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm font-semibold text-blue-700 mt-2">
                  {a.role}
                </p>

                <div className="prose-kwy mt-6 text-slate-600 text-base leading-relaxed space-y-3">
                  {a.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {a.quote && (
                  <blockquote className="mt-8 bg-blue-50/60 border-l-4 border-blue-600 p-6 rounded-r-2xl text-slate-700 text-sm md:text-base leading-relaxed">
                    <p>{a.quote}</p>
                  </blockquote>
                )}

                <p className="mt-6 text-xs text-slate-500 font-medium">
                  출처{" "}
                  <a
                    href={a.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline font-semibold ml-1"
                  >
                    {a.source.label} ↗
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 학술지 편집 */}
      <section className="section-y border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <SectionTitle
            kicker="Editorial"
            title="학술지 편집 활동"
            desc="학술지 편집위원 및 학회 활동입니다."
          />
          <div className="grid gap-3">
            {editorships.map((e) => (
              <div
                key={`${e.journal}-${e.period}`}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 flex flex-wrap items-center justify-between gap-4 hover:border-blue-200 transition-all"
              >
                <div>
                  <span className="font-bold text-base text-slate-900">
                    {e.journal}
                  </span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full ml-3">
                    {e.role}
                  </span>
                </div>
                <span className="num text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {e.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 언론 인용 · 인터뷰 */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle
            kicker="In the Media"
            title="언론 인용·인터뷰"
            desc="언론이 전문가로 취재·인용한 기사입니다. 발언은 기사 원문 그대로 옮겼습니다."
          />

          <div className="space-y-6">
            {mediaAppearances.map((m) => (
              <article
                key={m.url}
                className="bg-white rounded-3xl border border-slate-200/80 p-7 md:p-9 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                    {m.outlet}
                  </span>
                  <span className="num text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {m.date}
                  </span>
                  {m.relatedTopic && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full">
                      {m.relatedTopic}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 leading-snug">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {m.headline} ↗
                  </a>
                </h3>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-4">
                  {m.context}
                </p>

                <div className="mt-6 space-y-3">
                  {m.quotes.map((q, i) => (
                    <blockquote
                      key={i}
                      className="bg-blue-50/60 border-l-4 border-blue-600 p-5 rounded-r-2xl text-slate-700 text-sm md:text-base leading-relaxed"
                    >
                      “{q}”
                    </blockquote>
                  ))}
                </div>

                <p className="mt-6 text-xs text-slate-500 font-medium">
                  {m.reporter && <span>{m.reporter} · </span>}
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    기사 원문 ↗
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 저서 */}
      <section className="section-y border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <SectionTitle kicker="Books" title="저서" />
          <div className="grid gap-4 md:grid-cols-2">
            {books.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  『{b.title}』
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-3">
                  {b.publisher} · <span className="num">{b.date}</span>
                </p>
                {b.note && (
                  <p className="text-sm text-slate-600 mt-3">{b.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 언론 기고 */}
      {columns.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-kwy">
            <SectionTitle kicker="Columns" title="언론 기고" />
            <div className="space-y-3">
              {columns.map((c) => (
                <div
                  key={`${c.outlet}-${c.date}`}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 hover:border-blue-200 transition-all"
                >
                  <span className="num text-xs font-semibold text-slate-400">{c.date}</span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {c.title} ↗
                      </a>
                    ) : (
                      c.title
                    )}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 mt-1.5">{c.outlet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
