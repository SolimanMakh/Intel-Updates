import Card from "../common/Card";

export default function KpiBanner({
  kpis,
}: {
  kpis: Array<{ label: string; value: number }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {kpis.map((k) => (
        <Card key={k.label} className="p-5">
          <div className="text-sm text-slate-400">{k.label}</div>
          <div className="text-3xl font-bold">{k.value}</div>
        </Card>
      ))}
    </div>
  );
}
