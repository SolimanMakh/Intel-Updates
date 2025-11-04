import React from "react";
export default function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-300">
            {children}
        </span>
    );
}