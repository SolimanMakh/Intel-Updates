import Card from "../ui/common/Card";
import AppShell from "../ui/layout/AppShell";
export default function NotFound() {
  return (
    <AppShell title="Not found">
      <Card className="p-10 text-center text-slate-400">Page not found.</Card>
    </AppShell>
  );
}
