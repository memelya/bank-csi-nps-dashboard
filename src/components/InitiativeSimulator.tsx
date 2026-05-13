import { useState } from "react";

const initiatives = [
  { name: "Увеличение кредитного лимита", target: "явные промоутеры, потенциальные промоутеры, стабильные плательщики", exclude: "вероятные детракторы, клиенты с высокой загрузкой лимита, просрочки", effect: "рост оборота +4.5%, снижение жалоб относительно массовой кампании на 18%", risk: "misselling и рост долговой нагрузки", channel: "mobile app, персональный push, баннер в приложении" },
  { name: "Образовательный сценарий по льготному периоду", target: "клиенты с обращениями по льготному периоду и начислением процентов", exclude: "явные промоутеры без проблемного опыта", effect: "снижение обращений по теме на 12%, рост CSI на 0.3 п.п.", risk: "перегруз коммуникациями", channel: "push, in-app подсказка, email" },
  { name: "Cashback-кампания", target: "клиенты со снижением активности, нейтралы, потенциальные промоутеры", exclude: "клиенты с финансовым стрессом и просрочками", effect: "реактивация 9% базы", risk: "стоимость кампании выше incremental эффекта", channel: "push, баннер в приложении" },
  { name: "Реферальная программа", target: "явные промоутеры", exclude: "детракторы и потенциальные детракторы", effect: "рост качественных лидов, снижение негативных реакций", risk: "слабая мотивация без персонального оффера", channel: "mobile app, email, персональное предложение" },
  { name: "Financial health / soft collection", target: "высокая загрузка лимита, минимальные платежи, просрочки", exclude: "клиенты без признаков финансового стресса", effect: "снижение просрочки и жалоб", risk: "восприятие коммуникации как давления", channel: "SMS, push, звонок оператора, чат" },
];

export function InitiativeSimulator() {
  const [selected, setSelected] = useState(initiatives[0].name);
  const initiative = initiatives.find((item) => item.name === selected)!;
  return (
    <section id="simulator" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading"><span>07</span><div><h2>Симулятор инициатив</h2><p>Финальный слой — управленческое решение. Для каждой инициативы видны целевая база, исключения, ожидаемый эффект, риск и канал коммуникации.</p></div></div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="text-sm font-semibold text-slate-700">Выберите инициативу</label>
          <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" value={selected} onChange={(event) => setSelected(event.target.value)}>
            {initiatives.map((item) => <option key={item.name}>{item.name}</option>)}
          </select>
          <p className="mt-4 text-sm text-slate-500">Симулятор демонстрирует управленческую механику: целевая база → исключения → канал → ожидаемый эффект.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Metric title="Инициатива" value={initiative.name} />
          <Metric title="Целевая база" value={initiative.target} />
          <Metric title="База для исключения" value={initiative.exclude} danger />
          <Metric title="Ожидаемый эффект" value={initiative.effect} positive />
          <Metric title="Ключевой риск" value={initiative.risk} danger />
          <Metric title="Рекомендуемый канал" value={initiative.channel} />
        </div>
      </div>
    </section>
  );
}

function Metric({ title, value, danger, positive }: { title: string; value: string; danger?: boolean; positive?: boolean }) {
  return <article className={`rounded-2xl border p-5 ${danger ? "border-red-100 bg-red-50" : positive ? "border-emerald-100 bg-emerald-50" : "border-slate-200 bg-white"}`}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-2 text-lg font-semibold text-slate-950">{value}</p></article>;
}
