export const getArrayParam = (sp: URLSearchParams, key: string) =>
  sp.get(key)?.split(",").filter(Boolean) ?? [];
export const setArrayParam = (
  sp: URLSearchParams,
  key: string,
  arr: string[]
) => {
  if (!arr.length) sp.delete(key);
  else sp.set(key, arr.join(","));
};

export function applyFilters(items: any[], sp: URLSearchParams) {
  const q = (sp.get("q") || "").toLowerCase();
  const cats = new Set(getArrayParam(sp, "categories"));
  const tags = new Set(getArrayParam(sp, "tags"));
  const regions = new Set(getArrayParam(sp, "regions"));
  const sectors = new Set(getArrayParam(sp, "sectors"));
  const groups = new Set(getArrayParam(sp, "groups"));
  const from = sp.get("from");
  const to = sp.get("to");

  return items.filter((it) => {
    if (q && !`${it.title} ${it.summary}`.toLowerCase().includes(q))
      return false;
    if (cats.size && !cats.has(it.type)) return false;
    if (tags.size && !it.tags.some((t: string) => tags.has(t))) return false;
    if (sectors.size && !it.targetSectors.some((s: string) => sectors.has(s)))
      return false;
    if (groups.size && !it.threatActors?.some((g: string) => groups.has(g)))
      return false;

    if (regions.size) {
      const regionMap: Record<string, string[]> = {
        APAC: ["India", "Indonesia", "Australia"],
        EMEA: ["Egypt", "Jordan", "United Kingdom"],
        AMER: ["Canada"],
      };
      const flat = Object.entries(regionMap).flatMap(([r, list]) =>
        list.map((c) => ({ r, c }))
      );
      const countryToRegion = new Map(flat.map(({ r, c }) => [c, r]));
      const intersects = it.targetLocations.some((loc: string) =>
        regions.has(countryToRegion.get(loc) as string)
      );
      if (!intersects) return false;
    }

    if (from || to) {
      const ts = new Date(it.date).getTime();
      if (from && ts < new Date(from).getTime()) return false;
      if (to && ts > new Date(to).getTime()) return false;
    }
    return true;
  });
}
