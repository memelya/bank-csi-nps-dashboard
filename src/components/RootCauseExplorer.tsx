const rootCauses = [
  { reason: "Снижение активности", influence: 92, base: "288 000", delta: "+9 п.п.", action: "win-back / retention", tone: "red" },
  { reason: "Высокая загрузка лимита", influence: 86, base: "252 000", delta: "+3 п.п.", action: "financial health", tone: "red" },
  { reason: "Просмотр закрытия карты", influence: 81, base: "96 000", delta: "+4 п.п.", action: "срочный care", tone: "orange" },
  { reason: "Льготный период", influence: 68, base: "192 000", delta: "-1 п.п.", action: "образовательный сценарий", tone: "blue" },
  { reason: "Комиссии", influence: 61, base: "132 000", delta: "-1 п.п.", action: "прозрачность тарифов", tone: "blue" },
];

export function RootCauseExplorer() {
  return (
    <section id="root-cause" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>06</span>
        <div>
          <h2>Root cause explorer</h2>
          <p>Вместо списка причин — ранжирование по управленческой важности: сила влияния на детракцию, размер базы, расхождение с опросом и рекомендуемое действие.</p>
        </div>
      </div>
      <div className="root-cause-list">
        {rootCauses.map((item, index) => (
          <article className="root-cause-row" key={item.reason}>
            <div className="rank">#{index + 1}</div>
            <div className="root-main">
              <strong>{item.reason}</strong>
              <div className="influence-bar"><span style={{ width: `${item.influence}%` }} /></div>
            </div>
            <div className="root-metrics">
              <span>Влияние <b>{item.influence}/100</b></span>
              <span>База <b>{item.base}</b></span>
              <span>Δ vs опрос <b>{item.delta}</b></span>
            </div>
            <span className={`driver-badge ${item.tone}`}>{item.action}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
