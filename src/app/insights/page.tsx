import type { Metadata } from "next";
import { policyActivities, editorships, books } from "@/data/insights";
import { getColumns, getVideos, getMedia } from "@/lib/content";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import VideoEmbed from "@/components/VideoEmbed";
import JsonLd from "@/components/JsonLd";
import { insightsSchema, breadcrumbSchema } from "@/lib/jsonld";

// 칼럼은 DB에서 읽으므로, 저장 후 최대 10초 내 반영(관리자 저장 시 즉시 revalidate).
export const revalidate = 10;

export const metadata: Metadata = {
  title: "정책·기고",
  description:
    "금융위원회 신용평가체계 개편 T/F 위원·새출발기금 심사위원장 등 정책 활동, 내일신문 「경제시평」 연재 칼럼, 언론 인용·방송 출연 및 학술지 편집 활동.",
  alternates: { canonical: "/insights/" },
};

export default async function InsightsPage() {
  const [columns, videos, mediaAppearances] = await Promise.all([
    getColumns(),
    getVideos(),
    getMedia(),
  ]);
  return (
    <>
      <PageHero
        kicker="Policy & Insight"
        title="정책·기고"
        desc="정책 자문 활동과 내일신문 「경제시평」 연재 칼럼, 언론 인용, 학술지 편집 활동입니다. 모든 항목은 1차 출처를 함께 표기했습니다."
      />

      {/* 정책 자문 */}
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

                <p className="mt-6 text-xs text-slate-500 font-medium flex flex-wrap items-center gap-x-1 gap-y-1">
                  <span>출처</span>
                  {a.sources.map((s, i) => (
                    <span key={s.label} className="inline-flex items-center">
                      {i > 0 && <span className="text-slate-300 mr-1">·</span>}
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center min-h-11 md:min-h-0 text-blue-600 hover:underline font-semibold"
                        >
                          {s.label} ↗
                        </a>
                      ) : (
                        <span className="text-slate-600 font-semibold">{s.label}</span>
                      )}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 경제 인사이트 — 기고 칼럼 */}
      {columns.length > 0 && (
        <section className="section-y border-b border-slate-200/80 bg-white">
          <div className="container-kwy">
            <SectionTitle
              kicker="Economic Insight"
              title="경제 인사이트"
              desc="유경원 교수는 2020년부터 내일신문(석간) 「경제시평」에 매달 경제 칼럼을 연재하고 있습니다. 제목을 누르면 원문으로 이동합니다."
            />
            <ol className="grid gap-3 md:grid-cols-2">
              {columns.map((c) => (
                <li key={c.url ?? c.title}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/40 transition-all h-full"
                  >
                    <span className="num text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full shrink-0">
                      {c.date.slice(0, 7)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                        {c.title}
                        <span className="text-blue-500"> ↗</span>
                      </span>
                      <span className="block text-xs font-medium text-slate-500 mt-1">
                        {c.outlet}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="text-xs text-slate-400 mt-5">
              ※ 2025년 3월 이후분 일부입니다. 이전 연재분과 다른 매체 기고문은 순차 추가 예정입니다.
            </p>
          </div>
        </section>
      )}

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
                    className="inline-flex items-center min-h-11 md:min-h-0 text-blue-600 hover:underline font-semibold"
                  >
                    기사 원문 ↗
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 방송·영상 */}
      {videos.length > 0 && (
        <section className="section-y border-b border-slate-200/80 bg-white">
          <div className="container-kwy">
            <SectionTitle
              kicker="Broadcast & Video"
              title="방송·영상"
              desc="방송 출연 및 발표 영상입니다. 재생 버튼을 누르면 이 화면에서 바로 재생됩니다."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((v) => (
                <VideoEmbed key={v.youtubeId} video={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 학술지 편집 */}
      <section className="section-y border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <SectionTitle
            kicker="Editorial"
            title="학술지 편집 활동"
            desc="학술지 편집위원 활동입니다."
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

      {/* 저서 */}
      <section className="section-y">
        <div className="container-kwy">
          <SectionTitle kicker="Books" title="저서" />
          <div
            className={`grid gap-4 ${
              books.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {books.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
              >
                <h3 className="font-extrabold text-xl text-slate-900 leading-snug">
                  『{b.title}』
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-3">
                  {b.publisher} · <span className="num">{b.date}</span>
                  {b.note && <span> · {b.note}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          insightsSchema(columns),
          breadcrumbSchema([
            { name: "홈", path: "/" },
            { name: "정책·기고", path: "/insights/" },
          ]),
        ]}
      />
    </>
  );
}
