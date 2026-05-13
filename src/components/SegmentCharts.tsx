import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { segmentColors, segmentSummary } from "../data/generateSyntheticData";

const chartData = segmentSummary.map((item) => ({ name: item.segment, value: item.clients, share: item.share }));
const format = (value: unknown) => new Intl.NumberFormat("ru-RU").format(Number(Array.isArray(value) ? value[0] : value ?? 0));

export function SegmentCharts() {
  return (
    <section id="segments" className="section-card scroll-mt-20">
      <div className="section-heading">
        <span>02</span>
        <div>
          <h2>Карта сегментов</h2>
          <p>Модель переводит вероятности в управляемые клиентские базы: кого исключить из продаж, кого включить в care, а кого — в ростовые инициативы.</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="chart-card">
          <h3>Распределение базы</h3>
          <ResponsiveContainer width="100%" height={310}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={118} paddingAngle={3}>
                {chartData.map((entry) => <Cell key={entry.name} fill={segmentColors[entry.name]} />)}
              </Pie>
              <Tooltip formatter={(value) => `${format(value)} клиентов`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Объём сегментов</h3>
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={chartData} margin={{ left: 12, right: 16 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-12} textAnchor="end" height={80} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(value) => `${format(value)} клиентов`} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry) => <Cell key={entry.name} fill={segmentColors[entry.name]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="table-wrap mt-6">
        <table>
          <thead><tr><th>Сегмент</th><th>Условие</th><th>Клиентов</th><th>Доля базы</th><th>Основное действие</th></tr></thead>
          <tbody>
            {segmentSummary.map((row) => (
              <tr key={row.segment}>
                <td><span className="dot" style={{ background: segmentColors[row.segment] }} />{row.segment}</td>
                <td>{row.condition}</td><td>{format(row.clients)}</td><td>{row.share}</td><td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
