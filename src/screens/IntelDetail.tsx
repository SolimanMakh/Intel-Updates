import { Link, useLoaderData } from "react-router-dom";
import AppShell from "../ui/layout/AppShell";
import Card from "../ui/common/Card";
import { MOCK_ITEMS } from "../data/mockItems";
import Tag from "../ui/common/Tag";
import SmallIntelCard from "../ui/feed/SmalIntelCard";


export async function intelDetailLoader({ params }: any) {
    const item = MOCK_ITEMS.find((x) => x.id === params.id) || MOCK_ITEMS[0];
    // pick related by sharing at least one tag
    const related = MOCK_ITEMS.filter((x) => x.id !== item.id && x.tags.some((t: string) => item.tags.includes(t))).slice(0, 3);
    return { item, related };
}

export default function IntelDetail() {
    const { item, related } = useLoaderData() as any;
    return (
        <AppShell title={item.title}>
            <Breadcrumb />
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <section className="lg:col-span-9 space-y-6">
                    <HeroPanel item={item} />
                    <ArticlePanel item={item} />
                </section>
                <aside className="lg:col-span-3 space-y-4">
                    <RelatedPanel items={related} />
                </aside>
            </div>
        </AppShell>
    );
}


function Breadcrumb() {
    return (
        <div className="flex items-center justify-between">
            <nav className="text-sm text-slate-400">
                <Link className="hover:text-slate-200" to="/intel-updates">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-300">Intel Updates</span>
                <span className="mx-2">/</span>
                <span className="text-slate-100">Detail</span>
            </nav>
            <button onClick={() => window.print()} className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium hover:bg-sky-500">Export PDF</button>
        </div>
    );
}


function HeroPanel({ item }: { item: any }) {
    return (
        <Card className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-1/2 overflow-hidden rounded-xl">
                    <img className="w-full h-64 object-cover" src={item.imageUrl || `https://picsum.photos/seed/${item.id}/640/360`} />
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                    <Meta label="Organization" value="Company name" />
                    <Meta label="Website" value={
                        <div className="space-x-2">
                            <a className="underline text-sky-300" href="#">domain1.com</a>
                            <a className="underline text-sky-300" href="#">domain2.com</a>
                        </div>
                    } />
                    <Meta label="Target Sectors" value={<ChipList values={item.targetSectors} />} />
                    <Meta label="Target Location" value={<ChipList values={item.targetLocations} />} />
                    <Meta label="Threat Actors" value={<ChipList values={item.threatActors || []} />} />
                    <Meta label="Source" value={<a className="truncate block underline text-sky-300" href="#">https://example.com/source</a>} />
                    <div className="col-span-2">
                        <div className="text-sm text-slate-300 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">{item.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}


function ArticlePanel({ item }: { item: any }) {
    return (
        <Card className="p-5">
            <div className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()} <span className="mx-1">•</span> Type</div>
            <h2 className="mt-1 text-2xl font-bold text-slate-100">{item.title}</h2>
            <p className="mt-2 text-slate-300">{item.summary}</p>
            <div className="mt-4 space-y-3 text-slate-300 leading-7">
                <p>
                    Hello ** Community, today I have uploaded Boksha Database for you to download, thanks for reading and enjoy… This is placeholder content to simulate the long description section. Include bullet points, lists, and code blocks as needed.
                </p>
                <p>
                    The compromised data includes: Order Number, Order ID, Time of Order, Customer Name, Customer Email, Delivery Info, Payment Method, and other details.
                </p>
                <ul className="list-disc pl-6">
                    <li>Order summary and item details</li>
                    <li>Delivery address and contact information</li>
                    <li>Payment method and status</li>
                </ul>
            </div>
        </Card>
    );
}



function RelatedPanel({ items }: { items: any[] }) {
    return (
        <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-200">Related Intel</h3>
            <div className="space-y-3">
                {items.map((it) => (
                    <SmallIntelCard key={it.id} item={it} />
                ))}
            </div>
        </div>
    );
}


function Meta({ label, value }: { label: string; value: any }) {
    return (
        <div>
            <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
            <div className="mt-1 text-sm text-slate-200">{value}</div>
        </div>
    );
}


function ChipList({ values }: { values: string[] }) {
    if (!values?.length) return <span className="text-slate-500">—</span>;
    return (
        <div className="flex flex-wrap gap-2">
            {values.map((v) => (
                <Tag key={v}>{v}</Tag>
            ))}
        </div>
    );
}