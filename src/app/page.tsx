import Link from "next/link";
import { profile } from "@/data/profile";
import { trajectory } from "@/data/career";
import { publications, featuredIds } from "@/data/publications";
import { policyActivities } from "@/data/insights";
import PubRow from "@/components/PubRow";
import SectionTitle from "@/components/SectionTitle";
import Portrait from "@/components/Portrait";

const featured = featuredIds
  .map((id) => publications.find((p) => p.id === id))
  .filter((p) => p !== undefined);

const stats = [
  { value: publications.length, unit: "편", label: "논문 · 보고서", color: "from-blue-500 to-blue-600", bg: "bg-blue-50 text-blue-700 border-blue-200/60" },
  { value: 34, unit: "년", label: "연구 경력", color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60" },
  { value: trajectory.length, unit: "곳", label: "재직 기관", color: "from-amber-500 to-amber-600", bg: "bg-amber-50 text-amber-700 border-amber-200/60" },
  {
    value: publications.filter((p) => p.type === "해외저널").length,
    unit: "편",
    label: "해외 저널 게재",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  },
];

export default function Home() {
  const tf = policyActivities[0];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b border-slate-200/80 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="container-kwy grid gap-12 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {profile.affiliationEn}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {profile.nameKo}
              <span className="block mt-2 font-mono text-base md:text-lg font-semibold tracking-widest text-slate-400 uppercase">
                {profile.nameEn}
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl font-medium leading-relaxed text-slate-700 max-w-2xl">
              {profile.tagline}
            </p>

            <p className="mt-3 text-slate-500 font-medium text-sm md:text-base">
              {profile.affiliation} {profile.title}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/research"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-sm shadow-blue-500/25 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>연구 {publications.length}편 검색</span>
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/cv"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 rounded-full text-sm font-semibold shadow-xs transition-all duration-200"
              >
                이력서 (CV) 보기
              </Link>
            </div>
          </div>

          <div className="relative mx-auto md:mx-0">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-md opacity-25" />
            <div className="relative p-2 bg-white rounded-2xl border border-slate-200/80 shadow-md">
              <Portrait
                size={720}
                className="w-[240px] md:w-[280px] lg:w-[310px] h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stat strip ---------- */}
      <section className="py-10 border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/70 p-6 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${s.bg}`}>
                    {s.label}
                  </span>
                </div>
                <div>
                  <div className="num text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">
                    {s.value}
                    <span className="text-base text-slate-500 ml-1 font-sans font-medium">
                      {s.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle kicker="About" title="소개" />
          <div className="prose-kwy text-slate-600 text-base md:text-lg leading-relaxed space-y-4">
            {profile.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* 재직 궤적 */}
          <div className="mt-12">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4">
              주요 재직 기관 궤적
            </h3>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trajectory.map((t, idx) => (
                <li
                  key={t.org}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold mb-3">
                    0{idx + 1}
                  </span>
                  <p className="num text-xs text-slate-400 font-medium">{t.period}</p>
                  <p className="font-bold text-lg text-slate-900 mt-1">
                    {t.org}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">{t.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- 현재 정책 활동 ---------- */}
      <section className="section-y border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <SectionTitle kicker="Current Policy Activity" title="현재 정책 활동" />

          <article className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-indigo-50/30 to-white border border-blue-200/80 p-8 md:p-10 rounded-3xl shadow-xs hover:shadow-md transition-all">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-xs">
                {tf.org}
              </span>
              <span className="num text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                {tf.date}
              </span>
            </div>

            <h3 className="font-extrabold text-2xl md:text-3xl text-slate-900 leading-tight">
              {tf.title}
            </h3>

            <p className="text-sm font-semibold text-blue-700 mt-2">
              {tf.role}
            </p>

            <div className="prose-kwy mt-5 text-slate-700 text-base leading-relaxed">
              <p>{tf.body[0]}</p>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white px-5 py-2.5 rounded-full border border-blue-200 shadow-xs hover:shadow-sm transition-all"
            >
              <span>자세히 보기</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </article>
        </div>
      </section>

      {/* ---------- 연구 관심분야 ---------- */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle
            kicker="Research Areas"
            title="연구 관심분야"
            desc="미시 가구 패널 자료를 이용한 실증분석을 중심으로, 가계의 부채·저축 행태와 그 정책적 함의를 연구해 왔습니다."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {profile.researchAreas.map((a) => {
              const count = publications.filter((p) =>
                (p.topics as readonly string[]).includes(a.topic)
              ).length;
              return (
              <article key={a.title} className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-lg text-slate-900">
                    {a.title}
                  </h3>
                  <span className="num text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 px-3 py-1 rounded-full shrink-0">
                    {count}편
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {a.desc}
                </p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- 대표 연구 ---------- */}
      <section className="section-y bg-white">
        <div className="container-kwy">
          <SectionTitle kicker="Selected Papers" title="대표 연구" />
          <ul className="space-y-3">
            {featured.map((p) => (
              <PubRow key={p.id} pub={p} />
            ))}
          </ul>
          <div className="mt-8 text-center md:text-left">
            <Link href="/research" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-blue-600 text-sm font-semibold transition-all shadow-xs">
              <span>전체 {publications.length}편 연구 논문 보기</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
