import { ArrowUpRight, CircleDollarSign, ShieldAlert, TrendingUp } from "lucide-react";

const impactCards = [
  {
    icon: ShieldAlert,
    label: "Revenue at risk",
    value: "1,84 млрд ₽",
    note: "384 тыс. клиентов в детракторских сегментах × 4 800 ₽ годового дохода",
    tone: "red",
  },
  {
    icon: CircleDollarSign,
    label: "Opportunity pool",
    value: "1,61 млрд ₽",
    note: "336 тыс. клиентов с промоутерским потенциалом для growth/cross-sell",
    tone: "green",
  },
  {
    icon: TrendingUp,
    label: "Ожидаемый uplift",
    value: "+220 млн ₽",
    note: "синтетическая оценка эффекта при 12% успешной реактивации и 8% cross-sell",
    tone: "blue",
  },
];

export function ExecutiveImpact() {
  return (
    <section id="impact" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>03</span>
        <div>
          <h2>Финансовый слой: что стоит за CSI/NPS</h2>
          <p>Похожие CX-платформы связывают NPS не только с удовлетворённостью, но и с churn, revenue at risk и возможностями роста. Здесь CSI/NPS превращается в управленческий финансовый приоритет.</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {impactCards.map(({ icon: Icon, label, value, note, tone }) => (
          <article className={`impact-card ${tone}`} key={label}>
            <div className="impact-icon"><Icon /></div>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{note}</span>
          </article>
        ))}
      </div>
      <div className="executive-note">
        <strong>Как читать.</strong> Это не бухгалтерский расчёт, а executive-модель приоритизации: где деньги под риском, где потенциал роста и какие клиентские базы нужно защищать от неправильных продажных кампаний.
        <ArrowUpRight className="ml-2 inline size-4 align-text-bottom text-blue-600" />
      </div>
    </section>
  );
}
