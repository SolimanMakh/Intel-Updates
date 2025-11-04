export default function LabeledChips({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {values.length ? (
          values.map((v) => (
            <span
              key={v}
              className="truncate rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-300"
            >
              {v}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-500">—</span>
        )}
      </div>
    </div>
  );
}
