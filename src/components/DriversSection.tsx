import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type DriverDatum = { name: string; clients: number };

const detractor: DriverDatum[] = [
  { name: "Непонимание льготного периода", clients: 72000 }, { name: "Комиссионное раздражение", clients: 48000 }, { name: "Высокая загрузка лимита", clients: 95000 },
  { name: "Просрочка платежа", clients: 64000 }, { name: "Повторные обращения", clients: 58000 }, { name: "Снижение активности", clients: 110000 },
  { name: "Просмотр закрытия карты", clients: 36000 }, { name: "Отказанные операции", clients: 42000 },
];

const promoter: DriverDatum[] = [
  { name: "Регулярное использование карты", clients: 180000 }, { name: "Отсутствие жалоб", clients: 210000 }, { name: "Стабильные платежи", clients: 195000 },
  { name: "Высокий cashback", clients: 125000 }, { name: "Активность в приложении", clients: 160000 }, { name: "Положительная реакция", clients: 90000 }, { name: "Вовлечённость в лояльность", clients: 105000 },
];

const format = (value: unknown) => new Intl.NumberFormat("ru-RU").format(Number(Array.isArray(value) ? value[0] : value ?? 0));

function HorizontalChart({ data, color }: { data: { name: string; clients: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickFormatter={(v) => `${Number(v) / 1000}k`} />
        <YAxis dataKey="name" type="category" width={155} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => `${format(value)} клиентов`} />
        <Bar dataKey="clients" fill={color} radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DriversSection() {
  return (
    <section id="drivers" className="section-card scroll-mt-20">
      <div className="section-heading"><span>04</span><div><h2>Драйверы клиентского опыта</h2><p>После сравнения reactive vs predictive смотрим не просто на частоты, а на причины, которые объясняют управленческое действие: исключить, включить в care или развивать через cross-sell.</p></div></div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="chart-card"><h3>Топ-драйверы детракции</h3><HorizontalChart data={detractor} color="#b91c1c" /></div>
        <div className="chart-card"><h3>Топ-драйверы промоутерства</h3><HorizontalChart data={promoter} color="#16a34a" /></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Непонимание льготного периода", "72 000", "высокий", "Образовательный сценарий, калькулятор платежа, подсказки в приложении", "кампаний «тратьте больше»", "financial care"],
          ["Высокая загрузка лимита", "95 000", "высокий", "Financial health, soft collection, напоминания о платеже", "новых кредитных предложений", "сервисные сценарии"],
          ["Снижение активности", "110 000", "средний", "Win-back, персональный cashback, опрос причины", "повышения лимита без контекста", "retention"],
          ["Хороший продуктовый опыт", "180 000", "потенциал", "Кросс-сейл, реферальная программа, пилоты", "антиотточных сценариев", "growth initiatives"],
        ].map(([factor, base, risk, action, exclude, include]) => (
          <article className="insight-card" key={factor}>
            <p className="eyebrow">Фактор</p><h3>{factor}</h3>
            <dl><dt>Клиентская база</dt><dd>{base}</dd><dt>Риск</dt><dd>{risk}</dd><dt>Рекомендованное действие</dt><dd>{action}</dd><dt>Исключить из</dt><dd>{exclude}</dd><dt>Включить в</dt><dd>{include}</dd></dl>
          </article>
        ))}
      </div>
    </section>
  );
}
