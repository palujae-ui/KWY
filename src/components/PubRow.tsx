import { formatYm, type Publication } from "@/data/publications";

const TYPE_STYLE: Record<string, string> = {
  해외저널: "bg-blue-50 text-blue-700 border-blue-200/80 font-semibold",
  국내저널: "bg-indigo-50 text-indigo-700 border-indigo-200/80 font-medium",
  보고서: "bg-emerald-50 text-emerald-700 border-emerald-200/80 font-medium",
  저서: "bg-amber-50 text-amber-700 border-amber-200/80 font-medium",
};

export default function PubRow({
  pub,
  index,
}: {
  pub: Publication;
  index?: number;
}) {
  return (
    <li className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 mb-4 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full border ${
                TYPE_STYLE[pub.type] ?? "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {pub.type}
            </span>
            <span className="num text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {formatYm(pub.ym)}
            </span>
            {pub.topics.map((t) => (
              <span key={t} className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                #{t}
              </span>
            ))}
            {pub.award && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                🏆 {pub.award}
              </span>
            )}
          </div>

          <h3 className="font-bold text-base md:text-[1.08rem] leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
            {typeof index === "number" && (
              <span className="num text-slate-400 font-normal mr-2">
                {index}.
              </span>
            )}
            {pub.title}
          </h3>

          <p className="text-xs md:text-sm text-slate-500 font-medium italic">
            {pub.venue}
          </p>
        </div>
      </div>
    </li>
  );
}
