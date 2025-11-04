import { Link } from "react-router-dom";
export default function AppShell({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-sky-500" />
          <h1 className="text-lg font-semibold">Intel Updates</h1>
          <span className="text-slate-400">/ {title}</span>
          <nav className="ml-auto flex items-center gap-3 text-sm">
            <Link className="hover:text-white" to="/intel-updates">
              Dashboard
            </Link>
            <Link className="hover:text-white" to="/executive-overview">
              Executive
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-4 py-6">{children}</main>
    </div>
  );
}
