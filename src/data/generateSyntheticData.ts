export type Segment =
  | "Вероятный детрактор"
  | "Потенциальный детрактор"
  | "Нейтрал"
  | "Потенциальный промоутер"
  | "Явный промоутер";

export type Customer = {
  clientId: string;
  product: "Кредитная карта";
  segment: Segment;
  detractorProbability: number;
  promoterProbability: number;
  creditLimit: number;
  utilizationRate: number;
  daysPastDue: number;
  supportContacts90d: number;
  complaints90d: number;
  commissionEvents90d: number;
  declinedTransactions30d: number;
  turnoverChange30d: number;
  mobileAppVisits30d: number;
  viewedCloseCardPage: boolean;
  mainDriver: string;
  recommendedAction: string;
  exclusionFlag: string;
  inclusionFlag: string;
};

export const segmentColors: Record<Segment, string> = {
  "Вероятный детрактор": "#991b1b",
  "Потенциальный детрактор": "#f97316",
  "Нейтрал": "#64748b",
  "Потенциальный промоутер": "#86efac",
  "Явный промоутер": "#16a34a",
};

const detractorDrivers = [
  "Непонимание льготного периода",
  "Комиссионное раздражение",
  "Высокая загрузка кредитного лимита",
  "Просрочка платежа",
  "Повторные обращения в поддержку",
  "Снижение транзакционной активности",
  "Просмотр раздела «Закрыть карту»",
  "Отказанные операции",
];

const promoterDrivers = [
  "Регулярное использование карты",
  "Отсутствие жалоб",
  "Стабильные платежи",
  "Высокий cashback",
  "Активность в мобильном приложении",
  "Положительная реакция на коммуникации",
  "Высокая вовлечённость в программы лояльности",
];

const neutralDrivers = ["Средняя активность", "Стандартный продуктовый опыт", "Нет выраженного сигнала"];

const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
const int = (min: number, max: number) => Math.round(rnd(min, max));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const round = (value: number, digits = 2) => Number(value.toFixed(digits));

function segmentByIndex(index: number, total: number): Segment {
  const p = index / total;
  if (p < 0.13) return "Вероятный детрактор";
  if (p < 0.32) return "Потенциальный детрактор";
  if (p < 0.72) return "Нейтрал";
  if (p < 0.92) return "Потенциальный промоутер";
  return "Явный промоутер";
}

function actionFor(driver: string, segment: Segment) {
  if (driver.includes("льготного")) return "Educational care";
  if (driver.includes("загрузка") || driver.includes("Просрочка")) return "Financial health";
  if (driver.includes("активности")) return "Win-back cashback";
  if (segment === "Явный промоутер") return "Referral campaign";
  if (segment === "Потенциальный промоутер") return "Limit increase";
  if (segment === "Нейтрал") return "Standard communication";
  return "Service recovery";
}

function flags(segment: Segment, driver: string) {
  if (segment === "Вероятный детрактор") {
    return {
      exclusionFlag: driver.includes("загрузка") || driver.includes("Просрочка") ? "Exclude from credit offers" : "Exclude from sales",
      inclusionFlag: driver.includes("загрузка") || driver.includes("Просрочка") ? "Include in soft collection" : "Include in care",
    };
  }
  if (segment === "Потенциальный детрактор") return { exclusionFlag: "Exclude from aggressive sales", inclusionFlag: "Include in educational care" };
  if (segment === "Потенциальный промоутер") return { exclusionFlag: "No exclusion", inclusionFlag: "Include in limit campaign" };
  if (segment === "Явный промоутер") return { exclusionFlag: "No exclusion", inclusionFlag: "Include in cross-sell" };
  return { exclusionFlag: "No exclusion", inclusionFlag: "Standard campaigns" };
}

function makeCustomer(index: number, total: number): Customer {
  const segment = segmentByIndex(index, total);
  let detractorProbability = 0;
  let promoterProbability = 0;
  let utilizationRate = 0;
  let daysPastDue = 0;
  let supportContacts90d = 0;
  let complaints90d = 0;
  let commissionEvents90d = 0;
  let declinedTransactions30d = 0;
  let turnoverChange30d = 0;
  let mobileAppVisits30d = 0;
  let viewedCloseCardPage = false;
  let mainDriver = "";

  if (segment === "Вероятный детрактор") {
    detractorProbability = rnd(0.8, 0.98); promoterProbability = rnd(0.01, 0.15); utilizationRate = rnd(0.75, 0.98);
    daysPastDue = int(1, 30); supportContacts90d = int(2, 8); complaints90d = int(1, 3); commissionEvents90d = int(2, 8);
    declinedTransactions30d = int(2, 10); turnoverChange30d = rnd(-0.55, -0.12); mobileAppVisits30d = int(4, 22); viewedCloseCardPage = Math.random() < 0.42;
    mainDriver = viewedCloseCardPage ? "Просмотр раздела «Закрыть карту»" : pick(detractorDrivers);
  } else if (segment === "Потенциальный детрактор") {
    detractorProbability = rnd(0.6, 0.8); promoterProbability = rnd(0.05, 0.25); utilizationRate = rnd(0.55, 0.85);
    daysPastDue = Math.random() < 0.55 ? int(0, 10) : 0; supportContacts90d = int(1, 5); complaints90d = int(0, 2); commissionEvents90d = int(1, 5);
    declinedTransactions30d = int(0, 5); turnoverChange30d = rnd(-0.35, 0.02); mobileAppVisits30d = int(6, 28); viewedCloseCardPage = Math.random() < 0.22;
    mainDriver = pick(detractorDrivers);
  } else if (segment === "Нейтрал") {
    detractorProbability = rnd(0.25, 0.55); promoterProbability = rnd(0.2, 0.5); utilizationRate = rnd(0.25, 0.65);
    daysPastDue = Math.random() < 0.18 ? int(1, 5) : 0; supportContacts90d = int(0, 2); complaints90d = int(0, 1); commissionEvents90d = int(0, 3);
    declinedTransactions30d = int(0, 2); turnoverChange30d = rnd(-0.15, 0.16); mobileAppVisits30d = int(4, 24); viewedCloseCardPage = Math.random() < 0.06;
    mainDriver = pick(neutralDrivers);
  } else if (segment === "Потенциальный промоутер") {
    detractorProbability = rnd(0.05, 0.25); promoterProbability = rnd(0.65, 0.8); utilizationRate = rnd(0.2, 0.6);
    daysPastDue = 0; supportContacts90d = int(0, 1); complaints90d = 0; commissionEvents90d = int(0, 2);
    declinedTransactions30d = int(0, 1); turnoverChange30d = rnd(0.02, 0.28); mobileAppVisits30d = int(18, 55); viewedCloseCardPage = false;
    mainDriver = pick(promoterDrivers);
  } else {
    detractorProbability = rnd(0.01, 0.12); promoterProbability = rnd(0.8, 0.97); utilizationRate = rnd(0.18, 0.58);
    daysPastDue = 0; supportContacts90d = int(0, 1); complaints90d = 0; commissionEvents90d = int(0, 1);
    declinedTransactions30d = 0; turnoverChange30d = rnd(0.06, 0.38); mobileAppVisits30d = int(24, 70); viewedCloseCardPage = false;
    mainDriver = pick(promoterDrivers);
  }

  const flagValues = flags(segment, mainDriver);
  return {
    clientId: `CL-${String(index + 1).padStart(6, "0")}`,
    product: "Кредитная карта",
    segment,
    detractorProbability: round(detractorProbability),
    promoterProbability: round(promoterProbability),
    creditLimit: int(50, 900) * 1000,
    utilizationRate: round(utilizationRate),
    daysPastDue,
    supportContacts90d,
    complaints90d,
    commissionEvents90d,
    declinedTransactions30d,
    turnoverChange30d: round(turnoverChange30d),
    mobileAppVisits30d,
    viewedCloseCardPage,
    mainDriver,
    recommendedAction: actionFor(mainDriver, segment),
    ...flagValues,
  };
}

export function generateSyntheticData(count = 5000): Customer[] {
  return Array.from({ length: count }, (_, index) => makeCustomer(index, count)).sort(() => Math.random() - 0.5);
}

export const segmentSummary = [
  { segment: "Вероятный детрактор" as Segment, condition: "P(детрактор) > 0.80", clients: 156000, share: "13%", action: "Исключить из продаж, включить в care" },
  { segment: "Потенциальный детрактор" as Segment, condition: "0.60–0.80", clients: 228000, share: "19%", action: "Образовательные сценарии" },
  { segment: "Нейтрал" as Segment, condition: "0.35–0.60", clients: 480000, share: "40%", action: "Стандартные кампании" },
  { segment: "Потенциальный промоутер" as Segment, condition: "P(промоутер) > 0.65", clients: 240000, share: "20%", action: "Кросс-сейл" },
  { segment: "Явный промоутер" as Segment, condition: "P(промоутер) > 0.80", clients: 96000, share: "8%", action: "Рефералы, пилоты, амбассадоры" },
];
