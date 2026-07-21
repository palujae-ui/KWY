export default function PageHero({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="container-kwy">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-semibold tracking-wider uppercase border border-blue-200/60 mb-4">
          {kicker}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {desc && (
          <p className="prose-kwy mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}
