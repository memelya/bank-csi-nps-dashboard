import { useMemo, useState } from "react";
import type { Customer } from "../data/generateSyntheticData";
import { segmentColors } from "../data/generateSyntheticData";

const examples: Customer[] = [
  { clientId: "CL-000421", product: "Кредитная карта", segment: "Вероятный детрактор", detractorProbability: 0.87, promoterProbability: 0.04, creditLimit: 180000, utilizationRate: 0.91, daysPastDue: 8, supportContacts90d: 4, complaints90d: 2, commissionEvents90d: 3, declinedTransactions30d: 2, turnoverChange30d: -0.24, mobileAppVisits30d: 12, viewedCloseCardPage: false, mainDriver: "Непонимание льготного периода", recommendedAction: "Educational care", exclusionFlag: "Exclude from sales", inclusionFlag: "Include in care" },
  { clientId: "CL-000912", product: "Кредитная карта", segment: "Вероятный детрактор", detractorProbability: 0.82, promoterProbability: 0.07, creditLimit: 260000, utilizationRate: 0.94, daysPastDue: 14, supportContacts90d: 3, complaints90d: 1, commissionEvents90d: 1, declinedTransactions30d: 4, turnoverChange30d: -0.18, mobileAppVisits30d: 10, viewedCloseCardPage: false, mainDriver: "Высокая загрузка лимита", recommendedAction: "Financial health", exclusionFlag: "Exclude from credit offers", inclusionFlag: "Include in soft collection" },
  { clientId: "CL-001204", product: "Кредитная карта", segment: "Явный промоутер", detractorProbability: 0.06, promoterProbability: 0.89, creditLimit: 420000, utilizationRate: 0.36, daysPastDue: 0, supportContacts90d: 0, complaints90d: 0, commissionEvents90d: 0, declinedTransactions30d: 0, turnoverChange30d: 0.16, mobileAppVisits30d: 42, viewedCloseCardPage: false, mainDriver: "Хороший продуктовый опыт", recommendedAction: "Referral campaign", exclusionFlag: "No exclusion", inclusionFlag: "Include in cross-sell" },
  { clientId: "CL-002145", product: "Кредитная карта", segment: "Потенциальный промоутер", detractorProbability: 0.12, promoterProbability: 0.72, creditLimit: 310000, utilizationRate: 0.44, daysPastDue: 0, supportContacts90d: 1, complaints90d: 0, commissionEvents90d: 0, declinedTransactions30d: 0, turnoverChange30d: 0.11, mobileAppVisits30d: 35, viewedCloseCardPage: false, mainDriver: "Cashback engagement", recommendedAction: "Limit increase", exclusionFlag: "No exclusion", inclusionFlag: "Include in limit campaign" },
  { clientId: "CL-003331", product: "Кредитная карта", segment: "Нейтрал", detractorProbability: 0.38, promoterProbability: 0.31, creditLimit: 150000, utilizationRate: 0.48, daysPastDue: 0, supportContacts90d: 1, complaints90d: 0, commissionEvents90d: 1, declinedTransactions30d: 0, turnoverChange30d: 0.01, mobileAppVisits30d: 14, viewedCloseCardPage: false, mainDriver: "Средняя активность", recommendedAction: "Standard communication", exclusionFlag: "No exclusion", inclusionFlag: "Standard campaigns" },
];

const uniq = (rows: Customer[], key: keyof Customer) => Array.from(new Set(rows.map((row) => String(row[key])))).sort();

export function CustomerScoringTable({ customers }: { customers: Customer[] }) {
  const rows = useMemo(() => [...examples, ...customers.slice(0, 180)], [customers]);
  const [filters, setFilters] = useState({ segment: "", mainDriver: "", exclusionFlag: "", inclusionFlag: "", recommendedAction: "" });
  const filtered = rows.filter((row) => Object.entries(filters).every(([key, value]) => !value || String(row[key as keyof Customer]) === value));
  const update = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <section id="scoring" className="section-card scroll-mt-28 lg:scroll-mt-20">
      <div className="section-heading"><span>11</span><div><h2>Клиентский скоринг</h2><p>На уровне клиента логика становится операционной: вероятность → причина → recommended action → exclusion/inclusion flag.</p></div></div>
      <div className="filter-grid">
        {(Object.keys(filters) as (keyof typeof filters)[]).map((key) => (
          <label key={key}> {labels[key]}
            <select value={filters[key]} onChange={(e) => update(key, e.target.value)}>
              <option value="">Все</option>
              {uniq(rows, key as keyof Customer).map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        ))}
      </div>
      <p className="mb-3 text-sm text-slate-500">Показано: {filtered.length} строк из {rows.length}. Сгенерировано локально: {customers.length} клиентов.</p>
      <div className="table-wrap scoring-table mobile-card-table">
        <table>
          <thead><tr><th>Client ID</th><th>Сегмент</th><th>P(детрактор)</th><th>P(промоутер)</th><th>Главный драйвер</th><th>Рекомендованное действие</th><th>Exclusion flag</th><th>Inclusion flag</th></tr></thead>
          <tbody>{filtered.slice(0, 60).map((row) => <tr key={row.clientId}>
            <td data-label="Client ID">{row.clientId}</td><td data-label="Сегмент"><span className="dot" style={{ background: segmentColors[row.segment] }} />{row.segment}</td><td data-label="P(детрактор)">{row.detractorProbability.toFixed(2)}</td><td data-label="P(промоутер)">{row.promoterProbability.toFixed(2)}</td><td data-label="Главный драйвер">{row.mainDriver}</td><td data-label="Рекомендованное действие">{row.recommendedAction}</td><td data-label="Exclusion flag">{row.exclusionFlag}</td><td data-label="Inclusion flag">{row.inclusionFlag}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

const labels = {
  segment: "Сегмент",
  mainDriver: "Главный драйвер",
  exclusionFlag: "Exclusion flag",
  inclusionFlag: "Inclusion flag",
  recommendedAction: "Рекомендованное действие",
};
