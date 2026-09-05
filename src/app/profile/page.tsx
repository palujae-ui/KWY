import type { Metadata } from "next";
import { trajectory } from "@/data/career";
import { getEducation, getCareer, getProfile, getPublications } from "@/lib/content";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { buildFaq } from "@/data/faq";
import { profilePageSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "약력",
  description:
    "유경원 교수의 학력과 경력. 한국개발연구원(KDI), 한국은행, 보험연구원을 거쳐 상명대학교 경제금융학부 재직.",
  alternates: { canonical: "/profile/" },
};

export const revalidate = 10;

export default async function ProfilePage() {
  const [education, career, profile, publications] = await Promise.all([
    getEducation(),
    getCareer(),
    getProfile(),
    getPublications(),
  ]);

  const faq = buildFaq(
    publications.length,
    publications.filter((p) => p.type === "해외저널").length
  );
  return (
    <>
      <PageHero
        kicker="Curriculum Vitae"
        title="약력"
        desc="연구기관(KDI) · 중앙은행(한국은행) · 정책연구원(보험연구원) · 대학을 모두 거친 궤적입니다."
      />

      {/* 재직 궤적 요약 */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle kicker="Trajectory" title="재직 궤적" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trajectory.map((t, i) => (
              <li key={t.org} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all">
                <span className="num text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  0{i + 1}
                </span>
                <p className="num text-xs text-slate-400 font-semibold mt-3">{t.period}</p>
                <p className="font-bold text-lg text-slate-900 mt-1">
                  {t.org}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-normal">{t.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 학력 */}
      <section className="section-y border-b border-slate-200/80 bg-white">
        <div className="container-kwy">
          <SectionTitle kicker="Education" title="학력" />
          <div className="space-y-3">
            {education.map((e) => (
              <div
                key={e.ym}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-200 transition-all"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {e.school}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 mt-1">
                    {e.degree} · {e.field}
                    {e.note && (
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full ml-2">
                        {e.note}
                      </span>
                    )}
                  </p>
                </div>
                {e.ym && (
                  <span className="num text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shrink-0 self-start md:self-auto">
                    {e.ym.length >= 6
                      ? `${e.ym.slice(0, 4)}.${e.ym.slice(4)}`
                      : e.ym}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 경력 타임라인 */}
      <section className="section-y border-b border-slate-200/80">
        <div className="container-kwy">
          <SectionTitle
            kicker="Appointments"
            title="경력"
            desc="상근 재직 기관은 강조 표식으로, 위원·편집위원직은 일반 표식으로 구분했습니다."
          />
          <ol className="relative pl-6 border-l-2 border-slate-200 space-y-6">
            {career.map((c) => (
              <li key={`${c.org}-${c.from}`} className="relative pl-4">
                <span
                  className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                    c.primary
                      ? "bg-blue-600 ring-4 ring-blue-100"
                      : "bg-slate-300"
                  }`}
                  aria-hidden
                />
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                  <span className="num text-xs font-semibold text-slate-400">
                    {c.from} ~ {c.to ?? "현재"}
                  </span>
                  <p
                    className={`text-base md:text-lg mt-0.5 ${
                      c.primary ? "font-extrabold text-slate-900" : "font-bold text-slate-800"
                    }`}
                  >
                    {c.org}
                  </p>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{c.role}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 연락처 */}
      <section className="section-y bg-white">
        <div className="container-kwy">
          <SectionTitle kicker="Contact" title="연락처" />
          <dl className="grid gap-4 md:grid-cols-3">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
              <dt className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">Email</dt>
              <dd>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="inline-flex items-center min-h-11 md:min-h-0 font-semibold text-slate-900 hover:text-blue-600 text-base"
                >
                  {profile.contact.email}
                </a>
              </dd>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
              <dt className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">Phone</dt>
              <dd className="num font-semibold text-slate-900 text-base">
                {profile.contact.phone}
              </dd>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all">
              <dt className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">Office</dt>
              <dd className="font-semibold text-slate-900 text-base">
                {profile.contact.office}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Faq items={faq} />

      <JsonLd
        data={[
          profilePageSchema(),
          faqSchema(faq),
          breadcrumbSchema([
            { name: "홈", path: "/" },
            { name: "약력", path: "/profile/" },
          ]),
        ]}
      />
    </>
  );
}
