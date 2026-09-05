import SectionTitle from "@/components/SectionTitle";
import type { FaqItem } from "@/data/faq";

/**
 * FAQ 섹션.
 * ※ FAQPage 구조화 데이터는 화면에 실제로 보이는 내용만 표시해야 한다(검색엔진 정책).
 *    그래서 details 로 접되, 답변 텍스트는 항상 DOM 에 존재한다.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="section-y bg-white border-b border-slate-200/80">
      <div className="container-kwy">
        <SectionTitle
          kicker="FAQ"
          title="자주 묻는 질문"
          desc="연구 분야·정책 활동·연락처를 한눈에 정리했습니다."
        />
        <div className="space-y-3">
          {items.map((it, i) => (
            <details
              key={it.q}
              open={i === 0}
              className="group bg-slate-50/70 rounded-2xl border border-slate-200/80 open:border-blue-200 open:bg-white open:shadow-xs transition-all"
            >
              <summary className="cursor-pointer list-none flex items-start gap-3 p-5 md:p-6">
                <span className="num shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 mt-0.5">
                  Q{i + 1}
                </span>
                <h3 className="flex-1 font-bold text-base md:text-lg text-slate-900 leading-snug">
                  {it.q}
                </h3>
                <svg
                  className="w-5 h-5 shrink-0 text-slate-400 mt-0.5 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.25rem] md:pl-[4.75rem] -mt-1 text-[15px] leading-relaxed text-slate-600">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
