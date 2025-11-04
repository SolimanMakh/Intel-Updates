export function buildSectorsAnalytics(items: any[]) {
  const map = new Map<string, number>();
  items.forEach((it) =>
    it.tags
      .slice(0, 5)
      .forEach((t: string) => map.set(t, (map.get(t) || 0) + 1))
  );
  const entries = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const total = entries.reduce((acc, [, v]) => acc + v, 0) || 1;
  return {
    totalSectors: 122,
    segments: entries.map(([name, value], idx) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
      color: ["#22d3ee", "#60a5fa", "#a78bfa", "#f472b6", "#34d399"][idx % 5],
    })),
  };
}

export function buildCountryRanks(_items: any[]) {
  return [
    { code: "IN", name: "India", percent: 50 },
    { code: "CA", name: "Canada", percent: 30 },
    { code: "RU", name: "Russia", percent: 20 },
    { code: "GB", name: "United Kingdom", percent: 40 },
    { code: "AU", name: "Australia", percent: 60 },
  ];
}
