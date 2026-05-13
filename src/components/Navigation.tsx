const items = [
  ["Executive Summary", "summary"],
  ["Сегменты", "segments"],
  ["Драйверы", "drivers"],
  ["Продуктовые фичи", "features"],
  ["Клиентский скоринг", "scoring"],
  ["Симулятор инициатив", "simulator"],
];

export function Navigation() {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <a href="#summary" className="font-semibold text-slate-950">CSI/NPS Predictive Lab</a>
        <div className="hidden gap-1 lg:flex">
          {items.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
