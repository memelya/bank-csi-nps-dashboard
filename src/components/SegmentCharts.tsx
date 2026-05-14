import { Bar, BarChart, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { segmentColors, segmentSummary } from "../data/generateSyntheticData";
import { ChartFrame } from "./ChartFrame";

const chartData = segmentSummary.map((item) => ({ name: item.segment, value: item.clients, share: item.share }));
const format = (value: unknown) => new Intl.NumberFormat("ru-RU").format(Number(Array.isArray(value) ? value[0] : value ?? 0));

export function SegmentCharts() {
  return (
    <section id="segments" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>04</span>
        <div>
          <h2>Карта сегментов</h2>
          <p>Модель переводит вероятности в управляемые клиентские базы: кого исключить из продаж, кого включить в care, а кого — в ростовые инициативы.</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="chart-card">
          <h3>Распределение базы</h3>
          <ChartFrame height={310} mobileHeight={260}>
            {({ width, height }) => (
              <PieChart width={width} height={height}>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={width < 420 ? 48 : 72} outerRadius={width < 420 ? 88 : 118} paddingAngle={3}>
                  {chartData.map((entry) => <Cell key={entry.name} fill={segmentColors[entry.name]} />)}
                </Pie>
                <Tooltip formatter={(value) => `${format(value)} клиентов`} />
              </PieChart>
            )}
          </ChartFrame>
        </div>
        <div className="chart-card">
          <h3>Объём сегментов</h3>
          <ChartFrame height={310} mobileHeight={300}>
            {({ width, height }) => (
              <BarChart width={width} height={height} data={chartData} margin={{ left: width < 420 ? -14 : 12, right: 8, bottom: width < 420 ? 36 : 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: width < 420 ? 9 : 11 }} interval={0} angle={width < 420 ? -28 : -12} textAnchor="end" height={width < 420 ? 96 : 80} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => `${format(value)} клиентов`} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry) => <Cell key={entry.name} fill={segmentColors[entry.name]} />)}
                </Bar>
              </BarChart>
            )}
          </ChartFrame>
        </div>
      </div>
      <div className="table-wrap mobile-card-table mt-6">
        <table>
          <thead><tr><th>Сегмент</th><th>Условие</th><th>Клиентов</th><th>Доля базы</th><th>Основное действие</th></tr></thead>
          <tbody>
            {segmentSummary.map((row) => (
              <tr key={row.segment}>
                <td data-label="Сегмент"><span className="dot" style={{ background: segmentColors[row.segment] }} />{row.segment}</td>
                <td data-label="Условие">{row.condition}</td><td data-label="Клиентов">{format(row.clients)}</td><td data-label="Доля базы">{row.share}</td><td data-label="Основное действие">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
