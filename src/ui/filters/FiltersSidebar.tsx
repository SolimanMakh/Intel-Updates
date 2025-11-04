import { useSearchParams } from "react-router-dom";
import Card from "../common/Card";
import { LOOKUPS } from "../../data/lookups";
import { getArrayParam, setArrayParam } from "../../utils/filters";

export default function FiltersSidebar() {
  const [sp, setSp] = useSearchParams();

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(sp);
    mut(next);
    setSp(next, { replace: true }); // triggers loader (data router)
  };

  const bindText = (key: string) => ({
    value: sp.get(key) || "",
    onChange: (e: any) =>
      update((p) =>
        e.target.value ? p.set(key, e.target.value) : p.delete(key)
      ),
  });

  const bindMulti = (key: string, options: string[]) => {
    const selected = new Set(getArrayParam(sp, key));
    const toggle = (val: string) =>
      update((p) => {
        const arr = getArrayParam(p, key);
        const idx = arr.indexOf(val);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(val);
        setArrayParam(p, key, arr);
      });
    return { options, selected, toggle };
  };

  const clearAll = () => update((p) => p.forEach((_, k) => p.delete(k)));

  return (
    <div className="space-y-4 p-5 bg-slate-900/60 rounded-2xl">
      <Card className="p-4">
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          {...bindText("q")}
        />
      </Card>
      <FilterBlock label="Tags" {...bindMulti("tags", LOOKUPS.tags)} />
      <FilterBlock
        label="Industries"
        {...bindMulti("sectors", LOOKUPS.sectors)}
      />
      <FilterBlock label="Regions" {...bindMulti("regions", LOOKUPS.regions)} />
      <FilterBlock
        label="Categories"
        {...bindMulti("categories", LOOKUPS.categories)}
      />
      <FilterBlock label="Group" {...bindMulti("groups", LOOKUPS.groups)} />
      <Card className="p-4">
        <div className="text-sm text-slate-300 mb-2">Date range</div>
        <div className="flex flex-wrap items-center gap-2">
          <div>
            <input
              type="date"
              className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
              {...bindText("from")}
            />
          </div>

          <span className="text-slate-400">–</span>
          <div>
            <input
              type="date"
              className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm"
              {...bindText("to")}
            />
          </div>
        </div>
      </Card>
      <button
        onClick={clearAll}
        className="w-full rounded-xl bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
      >
        Clear all
      </button>
    </div>
  );
}

function FilterBlock({
  label,
  options,
  selected,
  toggle,
}: {
  label: string;
  options: string[];
  selected: Set<string>;
  toggle: (v: string) => void;
}) {
  return (
    <Card className="p-4">
      <div className="text-sm text-slate-300 mb-3 flex items-center justify-between">
        <span>{label}</span>
        {selected.size > 0 && (
          <span className="text-xs text-slate-400">
            {selected.size} selected
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={
              selected.has(opt)
                ? "rounded-full border border-sky-500 bg-sky-500/10 text-sky-300 px-3 py-1 text-xs"
                : "rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 px-3 py-1 text-xs"
            }
          >
            {opt}
          </button>
        ))}
      </div>
    </Card>
  );
}
