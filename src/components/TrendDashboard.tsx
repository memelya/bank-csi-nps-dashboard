import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "./ChartFrame";

const trendData = [
  { month: "Янв", detractors: 11, hiddenRisk: 17, responseRate: 9, nps: 24 },
  { month: "Фев", detractors: 12, hiddenRisk: 18, responseRate: 10, nps: 22 },
  { month: "Мар", detractors: 13, hiddenRisk: 21, responseRate: 10, nps: 19 },
  { month: "Апр", detractors: 15, hiddenRisk: 24, responseRate: 11, nps: 15 },
  { month: "Май", detractors: 13, hiddenRisk: 19, responseRate: 10, nps: 21 },
];

export function TrendDashboard() {
  return (
    <section id="trends" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading">
        <span>07</span>
        <div>
          <h2>Динамика во времени</h2>
          <p>Типовой NPS/CX dashboard показывает не только срез, но и тренд: растёт ли скрытый риск быстрее, чем это видно в реактивном опросе.</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="chart-card">
          <h3>CSI/NPS monitoring: опрос, риск и скрытая зона</h3>
          <ChartFrame height={330} mobileHeight={310}>
            {({ width, height }) => (
              <LineChart width={width} height={height} data={trendData} margin={{ left: width < 420 ? -18 : 0, right: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value, name) => name === "nps" ? `${value}` : `${value}%`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="detractors" name="Детракторы" stroke="#b91c1c" strokeWidth={3} />
                <Line type="monotone" dataKey="hiddenRisk" name="Hidden risk index" stroke="#f97316" strokeWidth={3} />
                <Line type="monotone" dataKey="responseRate" name="Response rate" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="nps" name="NPS" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            )}
          </ChartFrame>
        </div>
        <div className="trend-insights">
          <article><strong>Апрель</strong><span>скрытый риск вырос до 24%, а NPS просел до 15 — сигнал для stop-sales и care.</span></article>
          <article><strong>Май</strong><span>после care-сценариев риск снижается, но остаётся выше январского уровня.</span></article>
          <article><strong>Мониторинг</strong><span>если hidden risk растёт быстрее response rate, реактивный опрос недооценивает проблему.</span></article>
        </div>
      </div>
    </section>
  );
}
