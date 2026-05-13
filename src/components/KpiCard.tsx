type KpiCardProps = {
  title: string;
  value: string;
  tone?: "red" | "orange" | "slate" | "green" | "emerald" | "blue";
  note?: string;
};

const tones = {
  red: "border-red-200 bg-red-50 text-red-900",
  orange: "border-orange-200 bg-orange-50 text-orange-900",
  slate: "border-slate-200 bg-white text-slate-900",
  green: "border-green-200 bg-green-50 text-green-900",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
  blue: "border-blue-200 bg-blue-50 text-blue-900",
};

export function KpiCard({ title, value, tone = "slate", note }: KpiCardProps) {
  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${tones[tone]}`}>
      <p className="text-sm font-medium opacity-75">{title}</p>
      <strong className="mt-3 block text-2xl font-semibold tracking-tight md:text-3xl">{value}</strong>
      {note && <span className="mt-2 block text-xs opacity-70">{note}</span>}
    </article>
  );
}
