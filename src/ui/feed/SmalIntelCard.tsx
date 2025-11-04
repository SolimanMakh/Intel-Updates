import { Link } from "react-router-dom";
import Card from "../common/Card";


export default function SmallIntelCard({ item }: { item: any }) {
    return (
        <Card className="p-2">
            <Link to={`/intel/${item.id}`} className="flex gap-2">
                <div className="h-14 w-20 overflow-hidden rounded-md bg-slate-800">
                    {item.imageUrl ? (
                        <img src={item.imageUrl} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">No image</div>
                    )}
                </div>
                <div className="min-w-0">
                    <div className="text-[10px] text-slate-400">{new Date(item.date).toLocaleDateString()} • {item.type}</div>
                    <div className="line-clamp-2 text-xs text-slate-200">{item.title}</div>
                </div>
            </Link>
        </Card>
    );
}