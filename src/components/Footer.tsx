import { profile } from "@/data/profile";
import { FACULTY_PAGE } from "@/lib/jsonld";

export default function Footer() {
  return (
    <footer className="no-print mt-auto bg-slate-900 text-slate-300 border-t-4 border-blue-600">
      <div className="container-kwy py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                유
              </div>
              <p className="font-bold text-2xl text-white">
                {profile.nameKo}
              </p>
            </div>
            <p className="text-[12px] font-mono tracking-widest uppercase text-slate-400 mt-2">
              {profile.nameEn} · SMU ECONOMICS
            </p>
            <p className="text-sm text-slate-400 mt-3">{profile.affiliation}</p>
          </div>

          <dl className="text-sm grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2.5 md:text-right md:grid-cols-[auto]">
            <dt className="text-slate-400 md:hidden">이메일</dt>
            <dd>
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center min-h-11 md:min-h-0 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {profile.contact.email}
              </a>
            </dd>
            <dt className="text-slate-400 md:hidden">전화</dt>
            <dd className="num text-slate-300">{profile.contact.phone}</dd>
            <dt className="text-slate-400 md:hidden">연구실</dt>
            <dd className="text-slate-300">{profile.contact.office}</dd>
          </dl>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[13px] text-slate-400">
          <span>© {new Date().getFullYear()} Kyeongwon Yoo. All rights reserved.</span>
          <a
            href={FACULTY_PAGE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 min-h-11 md:min-h-0 px-4 py-2.5 md:py-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <span>상명대 학부 공식 프로필</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
