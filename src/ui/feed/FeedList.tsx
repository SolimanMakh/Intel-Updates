import Card from "../common/Card";
import IntelCard from "./IntelCard";
export default function FeedList({ items }: { items: any[] }) {
  if (!items.length)
    return (
      <Card className="p-8 text-center text-slate-400">
        No results match the current filters.
      </Card>
    );
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <IntelCard key={it.id} item={it} />
      ))}
    </div>
  );
}
