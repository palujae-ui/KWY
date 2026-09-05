import type { Metadata } from "next";
import { formatYm, ymNum } from "@/data/publications";
import { books } from "@/data/insights";
import { getProfile, getPublications, getEducation, getCareer } from "@/lib/content";
import PrintButton from "@/components/PrintButton";
import Portrait from "@/components/Portrait";

export const metadata: Metadata = {
  title: "CV",
  description: "유경원 교수 이력서 (Curriculum Vitae) — 학력, 경력, 논문.",
  alternates: { canonical: "/cv/" },
};

export const revalidate = 10;

function Rule({ children }: { children: string }) {
  return (
    <h2 className="font-extrabold text-lg text-slate-900 uppercase tracking-wider pb-2 mb-4 border-b-2 border-blue-600">
      {children}
    </h2>
  );
}

export default async function CvPage() {
  const [profile, publications, education, career] = await Promise.all([
    getProfile(),
    getPublications(),
    getEducation(),
    getCareer(),
  ]);
  const sorted = [...publications].sort(
    (a, b) => ymNum(b.ym) - ymNum(a.ym) || b.id - a.id
  );
  return (
    <div className="container-kwy py-12 md:py-16">
      {/* 머리말 */}
      <header className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-xs mb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <Portrait
              size={360}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-slate-200 object-cover shrink-0 shadow-xs"
            />
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-semibold mb-2">
                Curriculum Vitae
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                {profile.nameKo}
              </h1>
              <p className="font-mono text-sm font-semibold tracking-widest text-slate-400 uppercase mt-1.5">
                {profile.nameEn}
              </p>
              <p className="text-sm font-medium text-slate-600 mt-2">
                {profile.affiliation} {profile.title}
              </p>
            </div>
          </div>
          <dl className="text-xs md:text-sm text-slate-600 space-y-1.5 md:text-right bg-slate-50 p-4 rounded-xl border border-slate-200/70">
            <dd className="font-semibold text-blue-600">{profile.contact.email}</dd>
            <dd className="num">{profile.contact.phone}</dd>
            <dd>{profile.contact.office}</dd>
          </dl>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <PrintButton />
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-[minmax(0,300px)_1fr]">
        {/* 좌측: 학력 · 경력 */}
        <aside className="space-y-8">
          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <Rule>Education</Rule>
            <ul className="space-y-4">
              {education.map((e, i) => (
                <li key={`${e.school}-${i}`}>
                  <span className="num text-xs font-semibold text-slate-400">
                    {e.ym ? e.ym.slice(0, 4) : ""}
                  </span>
                  <p className="font-bold text-slate-900 text-base">
                    {e.school}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {e.degree} · {e.field}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <Rule>Appointments</Rule>
            <ul className="space-y-4">
              {career.map((c) => (
                <li key={`${c.org}-${c.from}`}>
                  <span className="num text-xs font-semibold text-slate-400">
                    {c.from} ~ {c.to ?? "현재"}
                  </span>
                  <p
                    className={`text-sm text-slate-900 mt-0.5 ${
                      c.primary ? "font-bold text-blue-700" : "font-semibold"
                    }`}
                  >
                    {c.org}
                  </p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <Rule>Research Areas</Rule>
            <ul className="space-y-2 text-sm text-slate-700 font-medium">
              {profile.researchAreas.map((a) => (
                <li key={a.title} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {a.title}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* 우측: 논문 · 저서 */}
        <div className="space-y-8">
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
            <Rule>Books</Rule>
            <ul className="space-y-3">
              {books.map((b) => (
                <li key={b.title} className="text-sm">
                  <span className="num text-xs font-semibold text-slate-400 mr-2 bg-slate-100 px-2 py-0.5 rounded">
                    {b.date.slice(0, 4)}
                  </span>
                  <span className="font-bold text-slate-900">
                    『{b.title}』
                  </span>
                  <span className="text-slate-500 font-medium"> · {b.publisher}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
            <Rule>{`Publications (${publications.length})`}</Rule>
            <ol className="space-y-3">
              {sorted.map((p, i) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[2rem_1fr] gap-x-2 text-sm leading-relaxed border-b border-slate-100 pb-2.5 last:border-0"
                >
                  <span className="num text-xs font-semibold text-slate-400 pt-0.5">{sorted.length - i}.</span>
                  <div>
                    <span className="font-semibold text-slate-900">{p.title}</span>
                    <span className="text-slate-500 italic">, {p.venue}</span>
                    <span className="num text-xs font-semibold text-blue-600 ml-1.5 bg-blue-50 px-2 py-0.5 rounded-full">
                      {formatYm(p.ym)}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
