const items = [
  ["Executive Summary", "summary"],
  ["Reactive vs Predictive", "method"],
  ["Сегменты", "segments"],
  ["Драйверы", "drivers"],
  ["Фичи", "features"],
  ["Скоринг", "scoring"],
  ["Инициативы", "simulator"],
];

export function Navigation() {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a href="#summary" className="shrink-0 font-semibold tracking-tight text-slate-950">CSI/NPS Predictive Lab</a>
          <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:inline-flex">Executive dashboard</span>
        </div>
        <div className="nav-scroll mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-0 lg:absolute lg:left-1/2 lg:top-3 lg:-translate-x-1/2 lg:overflow-visible lg:pb-0">
          {items.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 lg:border-transparent lg:bg-transparent">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
