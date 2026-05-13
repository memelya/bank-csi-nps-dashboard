import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
  { driver: "Высокая загрузка лимита", reactive: 18, predictive: 21 },
  { driver: "Снижение активности", reactive: 15, predictive: 24 },
  { driver: "Льготный период", reactive: 17, predictive: 16 },
  { driver: "Комиссии", reactive: 12, predictive: 11 },
  { driver: "Просмотр закрытия карты", reactive: 4, predictive: 8 },
];

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
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={coverage}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value, name) => name === "share" ? `${value}% базы` : `${Number(value).toLocaleString("ru-RU")} клиентов`} />
              <Bar dataKey="share" radius={[8, 8, 0, 0]}>
                <Cell fill="#2563eb" /><Cell fill="#94a3b8" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card xl:col-span-2">
          <h3>Может ли реактивный сбор показать то же самое?</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={comparison}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="segment" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="reactive" name="Реактивный опрос" fill="#93c5fd" radius={[8, 8, 0, 0]} />
              <Line dataKey="predictive" name="Предиктивная база" stroke="#0f172a" strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="chart-card">
          <h3>Где совпадают причины, а где предиктивная модель расширяет картину</h3>
          <ResponsiveContainer width="100%" height={310}>
            <ComposedChart data={driverOverlap}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="driver" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="reactive" name="В ответах CSI/NPS" fill="#bfdbfe" radius={[8, 8, 0, 0]} />
              <Line dataKey="predictive" name="В неответившей базе" stroke="#b91c1c" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="decision-card">
          <p className="eyebrow">Ключевой вывод</p>
          <h3>Да, реактивный сбор может показывать похожую структуру — и это хорошо.</h3>
          <p>Если сегменты и драйверы совпадают, предиктивная модель валидирует опрос и масштабирует его на всю базу. Если расходятся — это сигнал sample bias: отвечают не все, а скрытые риски живут в поведении клиентов.</p>
          <ul>
            <li><strong>Совпадение</strong> = можно масштабировать известные care-сценарии.</li>
            <li><strong>Расхождение</strong> = нужно проверить гипотезу и исключить рискованные базы из продаж.</li>
            <li><strong>Главная ценность</strong> = не новый NPS, а управляемая клиентская база для действий.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
