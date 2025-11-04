import Card from "../common/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TopSectorsCard({ data }: { data: any }) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Top Targeted Sectors</h3>
        <div className="select-none rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">
          This year
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="col-span-2 h-44">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 12,
                }}
              />
              <Pie
                data={data.segments}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={70}
              >
                {data.segments.map((s: any, i: number) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="text-3xl font-bold">{data.totalSectors}</div>
          <div className="text-xs text-slate-400 -mt-1">Total Sectors</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {data.segments.map((s: any) => (
          <div key={s.name} className="flex items-center gap-3 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="flex-1 truncate">{s.name}</span>
            <span className="text-slate-400">{s.percent}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
