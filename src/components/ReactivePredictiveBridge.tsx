import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "./ChartFrame";

const comparison = [
  { segment: "Детракторы", reactive: 14, predictive: 13, color: "#991b1b" },
  { segment: "Потенциальные детракторы", reactive: 16, predictive: 19, color: "#f97316" },
  { segment: "Нейтралы", reactive: 42, predictive: 40, color: "#64748b" },
  { segment: "Промоутеры", reactive: 28, predictive: 28, color: "#16a34a" },
];

const coverage = [
  { name: "Ответили на опрос", clients: 120000, share: 10 },
  { name: "Не оставили обратную связь", clients: 1080000, share: 90 },
];

const driverOverlap = [
  { driver: "Высокая загрузка лимита", reactive: 18, predictive: 21, interpretation: "подтверждено", action: "масштабировать care-сценарии", tone: "blue" },
  { driver: "Снижение активности", reactive: 15, predictive: 24, interpretation: "скрытый риск", action: "исключить из продаж и проверить удержание", tone: "red" },
  { driver: "Льготный период", reactive: 17, predictive: 16, interpretation: "подтверждено", action: "уточнить коммуникации по правилам", tone: "blue" },
  { driver: "Комиссии", reactive: 12, predictive: 11, interpretation: "подтверждено", action: "оставить в базе известных причин", tone: "blue" },
  { driver: "Просмотр закрытия карты", reactive: 4, predictive: 8, interpretation: "модель расширяет картину", action: "перевести в retention/care", tone: "orange" },
];

const getDelta = (predictive: number, reactive: number) => predictive - reactive;
const formatDelta = (delta: number) => `${delta > 0 ? "+" : ""}${delta} п.п.`;
const getComparisonStatus = (delta: number) => {
  const abs = Math.abs(delta);
  if (abs <= 2) return "совпадает";
  if (abs <= 5) return "умеренное расхождение";
  return "sample bias / скрытый риск";
};

export function ReactivePredictiveBridge() {
  return (
    <section id="method" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>02</span>
        <div>
          <h2>От реактивной обратной связи к предиктивной разметке базы</h2>
          <p>Реактивный CSI/NPS показывает голос тех, кто ответил. Предиктивный подход не заменяет опрос, а масштабирует его логику на клиентов без ответа и показывает, где картина совпадает, а где есть скрытый риск.</p>
        </div>
      </div>

      <div className="story-flow">
        <article><strong>1. Есть факт</strong><span>120 тыс. клиентов оставили обратную связь: по ним известны CSI/NPS, жалобы и причины опыта.</span></article>
        <article><strong>2. Есть слепая зона</strong><span>1,08 млн активных клиентов не ответили, но имеют поведенческие сигналы в продукте.</span></article>
        <article><strong>3. Модель переносит паттерны</strong><span>Вероятность детракции/промоутерства считается по похожим продуктовым сигналам.</span></article>
        <article><strong>4. Бизнес получает действие</strong><span>Не просто «кто недоволен», а кого исключить из продаж и куда включить.</span></article>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="chart-card xl:col-span-1">
          <h3>Покрытие клиентской базы</h3>
          <ChartFrame height={280} mobileHeight={260}>
            {({ width, height }) => (
              <BarChart width={width} height={height} data={coverage} margin={{ left: width < 420 ? -18 : 0, right: 8, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: width < 420 ? 10 : 12 }} interval={0} />
                <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value, name) => name === "share" ? `${value}% базы` : `${Number(value).toLocaleString("ru-RU")} клиентов`} />
                <Bar dataKey="share" radius={[8, 8, 0, 0]}>
                  <Cell fill="#2563eb" /><Cell fill="#94a3b8" />
                </Bar>
              </BarChart>
            )}
          </ChartFrame>
        </div>

        <div className="chart-card xl:col-span-2">
          <h3>Насколько опрос репрезентативен для всей базы?</h3>
          <p className="chart-note">Метод сравнения: считаем разницу между предиктивной базой и реактивным опросом в процентных пунктах. 0–2 п.п. — совпадает, 3–5 п.п. — зона внимания, больше 5 п.п. — возможный sample bias.</p>
          <div className="table-wrap mobile-card-table comparison-table mt-4">
            <table>
              <thead><tr><th>Сегмент</th><th>Опрос</th><th>Модель</th><th>Δ</th><th>Вывод</th></tr></thead>
              <tbody>
                {comparison.map((row) => {
                  const delta = getDelta(row.predictive, row.reactive);
                  return (
                    <tr key={row.segment}>
                      <td data-label="Сегмент"><span className="dot" style={{ background: row.color }} />{row.segment}</td>
                      <td data-label="Опрос">{row.reactive}%</td>
                      <td data-label="Модель">{row.predictive}%</td>
                      <td data-label="Δ"><span className={`delta-pill ${Math.abs(delta) <= 2 ? "ok" : "warn"}`}>{formatDelta(delta)}</span></td>
                      <td data-label="Вывод">{getComparisonStatus(delta)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="chart-card">
          <h3>Какие причины подтверждены опросом, а какие видны только в поведении?</h3>
          <p className="chart-note">Метод сравнения: driver delta = доля причины в неответившей базе минус доля причины в ответах CSI/NPS. Большая положительная Δ показывает, где модель расширяет картину.</p>
          <div className="driver-matrix mt-4">
            {driverOverlap.map((row) => {
              const delta = getDelta(row.predictive, row.reactive);
              return (
                <article className={`driver-row ${row.tone}`} key={row.driver}>
                  <div>
                    <strong>{row.driver}</strong>
                    <span>{row.action}</span>
                  </div>
                  <div className="driver-values">
                    <span>Опрос <b>{row.reactive}%</b></span>
                    <span>Модель <b>{row.predictive}%</b></span>
                    <span className="driver-delta">{formatDelta(delta)}</span>
                  </div>
                  <span className={`driver-badge ${row.tone}`}>{row.interpretation}</span>
                </article>
              );
            })}
          </div>
        </div>
        <div className="decision-card">
          <p className="eyebrow">Итог сравнения</p>
          <h3>Опрос подтверждает базовую картину, модель показывает скрытые зоны риска.</h3>
          <div className="method-score-grid">
            <div><strong>4 из 4</strong><span>сегмента близки по структуре</span></div>
            <div><strong>3 из 5</strong><span>причины подтверждены опросом</span></div>
            <div><strong>2</strong><span>скрытых драйвера риска</span></div>
          </div>
          <ul>
            <li><strong>Совпадение</strong> = можно масштабировать известные care-сценарии.</li>
            <li><strong>Сильная положительная Δ</strong> = причина недооценена реактивным сбором.</li>
            <li><strong>Действие</strong> = рискованные базы не продавать, а переводить в care/retention.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
