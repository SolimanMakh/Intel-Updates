import { LOOKUPS } from "./lookups";
export const MOCK_ITEMS = Array.from({ length: 28 }).map((_, i) => ({
  id: `intel-${i + 1}`,
  date: new Date(2024, 4, 20 - (i % 7)).toISOString(),
  type: LOOKUPS.categories[i % LOOKUPS.categories.length],
  title: `The Alleged Database of Kementerian Perhubungan Republik Indonesia is Leaked #${
    i + 1
  }`,
  summary:
    "In a hacker forum monitored by SOCRadar, a new alleged database leak is detected...",
  imageUrl:
    i % 4 === 0 ? undefined : `https://picsum.photos/seed/intel${i}/240/140`,
  targetSectors: [
    LOOKUPS.industries[0],
    LOOKUPS.sectors[i % LOOKUPS.sectors.length],
  ],
  targetLocations: ["Egypt", "Jordan", i % 3 === 0 ? "Indonesia" : ""].filter(
    Boolean
  ),
  threatActors: [i % 2 ? "group name" : "unknown"],
  tags: LOOKUPS.tags.slice(0, (i % 6) + 1),
}));
