import { useState } from "react";

const segmentDetails = [
  {
    name: "Вероятные детракторы",
    base: "156 000",
    share: "13%",
    priority: "Критичный",
    reasons: ["Высокая загрузка лимита", "Просмотр закрытия карты", "Повторные обращения"],
    signals: ["utilization > 75%", "DPD 1–30", "рост отказанных операций"],
    action: "Исключить из продаж, перевести в service recovery и financial health",
    campaign: "Care-call + in-app объяснение платежа + мягкое удержание",
    tone: "red",
  },
  {
    name: "Потенциальные детракторы",
    base: "228 000",
    share: "19%",
    priority: "Высокий",
    reasons: ["Снижение активности", "Комиссионное раздражение", "Льготный период"],
    signals: ["turnover -20%", "2+ support contacts", "fee events"],
    action: "Не давить продажами, запустить educational care и win-back",
    campaign: "Персональный cashback + сценарий по льготному периоду",
    tone: "orange",
  },
  {
    name: "Нейтралы",
    base: "480 000",
    share: "40%",
    priority: "Средний",
    reasons: ["Стандартный опыт", "Нет выраженного сигнала", "Средняя активность"],
    signals: ["стабильный оборот", "редкие обращения", "нет жалоб"],
    action: "Тестировать мягкие кампании и отслеживать сдвиг в риск/рост",
    campaign: "A/B тест коммуникаций и продуктовых подсказок",
    tone: "slate",
  },
  {
    name: "Промоутерский потенциал",
    base: "336 000",
    share: "28%",
    priority: "Рост",
    reasons: ["Регулярное использование", "Отсутствие жалоб", "Активность в приложении"],
    signals: ["mobile visits 18+", "0 DPD", "positive turnover"],
    action: "Включить в cross-sell, лимитные предложения и referral",
    campaign: "Персональный offer + реферальная программа",
    tone: "green",
  },
];

export function SegmentDrilldown() {
  const [selected, setSelected] = useState(segmentDetails[0].name);
  const active = segmentDetails.find((item) => item.name === selected)!;

  return (
    <section id="drilldown" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>05</span>
        <div>
          <h2>Drill-down по сегментам</h2>
          <p>В BI-дашбордах сегмент — это не конец анализа, а вход в причины, продуктовые сигналы и конкретную кампанию. Здесь можно быстро увидеть, что делать с каждой базой.</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="segment-tabs">
          {segmentDetails.map((item) => (
            <button className={item.name === selected ? "active" : ""} key={item.name} onClick={() => setSelected(item.name)}>
              <span>{item.name}</span>
              <b>{item.base}</b>
            </button>
          ))}
        </div>
        <article className={`drill-card ${active.tone}`}>
          <div className="drill-header">
            <div>
              <p className="eyebrow">Выбранный сегмент</p>
              <h3>{active.name}</h3>
            </div>
            <div><strong>{active.base}</strong><span>{active.share} базы · {active.priority}</span></div>
          </div>
          <div className="drill-grid">
            <InfoList title="Топ причин" items={active.reasons} />
            <InfoList title="Поведенческие сигналы" items={active.signals} />
            <div className="drill-action"><span>Основное действие</span><strong>{active.action}</strong></div>
            <div className="drill-action"><span>Пример кампании</span><strong>{active.campaign}</strong></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return <div className="info-list"><span>{title}</span><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
