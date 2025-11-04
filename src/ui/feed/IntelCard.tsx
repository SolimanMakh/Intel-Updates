import { NavLink } from "react-router-dom";
import Card from "../common/Card";
import LabeledChips from "./LabeledChips";
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function IntelCard({ item }: { item: any }) {
  return (
    <Card className="p-4">
      <div className="flex  gap-4">
        <div className="w-40 shrink-0 overflow-hidden rounded-xl bg-slate-800">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt="thumb"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-xs text-slate-400">
            {fmtDate(item.date)} <span className="mx-1">•</span> Type:{" "}
            {item.type}
          </div>
          <NavLink to={"/intel/" + item.id} end>
            <div className="mb-1 truncate text-sky-300 hover:text-sky-200 cursor-pointer font-medium">{item.title}</div>
          </NavLink>
          <div className="mb-2 line-clamp-1 text-sm text-slate-300">
            {item.summary}
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3 text-sm">
            <LabeledChips label="Target Sectors" values={item.targetSectors} />
            <LabeledChips
              label="Target Location"
              values={item.targetLocations}
            />
            <LabeledChips
              label="Threat Actors"
              values={item.threatActors || []}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
