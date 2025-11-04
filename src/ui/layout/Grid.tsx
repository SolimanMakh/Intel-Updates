export default function Grid({
  sidebar,
  content,
}: {
  sidebar: any;
  content: any;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <aside className="lg:col-span-3 space-y-4">{sidebar}</aside>
      <section className="lg:col-span-9 space-y-6">{content}</section>
    </div>
  );
}
