export default function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-10">
      {kicker && (
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-semibold tracking-wider uppercase border border-blue-200/60 mb-3">
          {kicker}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {desc && <p className="prose-kwy mt-3 text-slate-600 text-base leading-relaxed">{desc}</p>}
    </div>
  );
}
