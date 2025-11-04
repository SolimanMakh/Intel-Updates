import Card from "../common/Card";
const flag = (cc: string) =>
  `https://flagcdn.com/24x18/${cc.toLowerCase()}.png`;

export default function TopCountriesCard({
  data,
}: {
  data: Array<{ code: string; name: string; percent: number }>;
}) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Top Targeted Countries</h3>
        <div className="select-none rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">
          This year
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((c) => (
          <div key={c.code}>
            <div className="mb-1 flex items-center gap-2 text-sm">
              <img
                src={flag(c.code)}
                alt="flag"
                className="h-[14px] w-[18px] rounded-sm border border-slate-700"
              />
              <span className="flex-1">{c.name}</span>
              <span className="text-slate-400">{c.percent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500"
                style={{ width: `${c.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
