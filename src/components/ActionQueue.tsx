const queues = [
  { title: "Исключить из продаж", base: "384 000", criterion: "P(детрактор) > 0.60 или финансовый стресс", channel: "campaign suppression", effect: "меньше жалоб и misselling", tone: "red" },
  { title: "Care-сценарий", base: "384 000", criterion: "детракторские причины + обращения", channel: "push, чат, оператор", effect: "service recovery", tone: "orange" },
  { title: "Retention call", base: "96 000", criterion: "просмотр закрытия карты / резкое падение активности", channel: "звонок или персональный чат", effect: "снижение оттока", tone: "red" },
  { title: "Cross-sell", base: "336 000", criterion: "P(промоутер) > 0.65 и нет жалоб", channel: "in-app offer", effect: "рост оборота", tone: "green" },
  { title: "Referral", base: "96 000", criterion: "явные промоутеры", channel: "мобильное приложение", effect: "качественные лиды", tone: "blue" },
];

export function ActionQueue() {
  return (
    <section id="actions" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>08</span>
        <div>
          <h2>Action queue: из аналитики в выполнение</h2>
          <p>Лучшие CX/NPS dashboards заканчиваются не графиком, а очередями действий: кого не трогать продажами, кого спасать, а кого развивать.</p>
        </div>
      </div>
      <div className="action-board">
        {queues.map((item) => (
          <article className={`queue-card ${item.tone}`} key={item.title}>
            <div><span>{item.title}</span><strong>{item.base}</strong></div>
            <dl>
              <dt>Критерий</dt><dd>{item.criterion}</dd>
              <dt>Канал</dt><dd>{item.channel}</dd>
              <dt>Эффект</dt><dd>{item.effect}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
