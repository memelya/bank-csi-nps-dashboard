import { useMemo } from "react";
import { ShieldCheck, TrendingUp, UsersRound } from "lucide-react";
import { CustomerScoringTable } from "./components/CustomerScoringTable";
import { DriversSection } from "./components/DriversSection";
import { InitiativeSimulator } from "./components/InitiativeSimulator";
import { KpiCard } from "./components/KpiCard";
import { Navigation } from "./components/Navigation";
import { ProductFeaturesTable } from "./components/ProductFeaturesTable";
import { SegmentCharts } from "./components/SegmentCharts";
import { ReactivePredictiveBridge } from "./components/ReactivePredictiveBridge";
import { generateSyntheticData } from "./data/generateSyntheticData";

const kpis = [
  ["Активная база кредитных карт", "1 200 000", "blue", "100% продуктовой базы"],
  ["Клиенты без обратной связи", "1 080 000", "slate", "оценка вне опросов"],
  ["Вероятные детракторы", "156 000", "red", "13% базы"],
  ["Потенциальные детракторы", "228 000", "orange", "19% базы"],
  ["Нейтралы", "480 000", "slate", "40% базы"],
  ["Потенциальные промоутеры", "240 000", "green", "20% базы"],
  ["Явные промоутеры", "96 000", "emerald", "8% базы"],
  ["Клиенты к исключению из продаж", "384 000", "red", "детракторские сегменты"],
  ["Клиенты к включению в care-сценарии", "384 000", "orange", "сервисное восстановление"],
  ["Клиенты к включению в кросс-сейл", "336 000", "emerald", "промоутерский потенциал"],
] as const;

export default function App() {
  const customers = useMemo(() => generateSyntheticData(5000), []);
  return (
    <>
      <Navigation />
      <main>
        <section id="summary" className="hero scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="eyebrow">Executive dashboard · синтетические данные · без backend</p>
                <h1>От опросов CSI/NPS к управлению всей клиентской базой</h1>
                <p className="lead">Прототип показывает не отдельные графики, а последовательную бизнес-логику: что уже видно в реактивной обратной связи, что остаётся слепой зоной, как предиктивная модель переносит эти паттерны на клиентов без ответа и какие действия должен принять банк.</p>
              </div>
              <div className="hero-panel">
                <div><ShieldCheck /><span>Нет реальных персональных данных</span></div>
                <div><UsersRound /><span>5 000 синтетических клиентов в локальном генераторе</span></div>
                <div><TrendingUp /><span>Фокус на управленческом решении, а не ML-модели</span></div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {kpis.map(([title, value, tone, note]) => <KpiCard key={title} title={title} value={value} tone={tone} note={note} />)}
            </div>
            <div className="executive-note">
              <strong>Управленческий вывод.</strong> Реактивный CSI/NPS остаётся источником правды по ответившим клиентам. Предиктивная разметка нужна не для замены опроса, а для масштабирования его выводов на 90% базы без обратной связи и для принятия решений: кого не трогать продажами, кого вести в care, а кого включать в ростовые инициативы.
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:px-8">
          <ReactivePredictiveBridge />
          <SegmentCharts />
          <DriversSection />
          <ProductFeaturesTable />
          <CustomerScoringTable customers={customers} />
          <InitiativeSimulator />
          <section className="rounded-3xl bg-slate-950 p-6 text-white lg:p-8">
            <h2 className="text-2xl font-semibold">Итоговый смысл демонстрации</h2>
            <p className="mt-3 max-w-4xl text-slate-300">Банк может разметить активную базу по вероятности детракции и промоутерства, понять причины опыта, связать их с продуктовыми фичами, сформировать базы для care, retention, cross-sell и referral, а также исключить рискованные сегменты из неподходящих продажных кампаний.</p>
          </section>
        </div>
      </main>
    </>
  );
}
