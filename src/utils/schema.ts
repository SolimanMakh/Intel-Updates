export const PAGE_SCHEMAS: Record<string, any> = {
  "intel-updates": {
    title: "Intel Updates",
    layout: [{ component: "AnalyticsRow" }, { component: "FeedList" }],
  },
  "executive-overview": {
    title: "Executive Overview",
    layout: [
      {
        component: "KpiBanner",
        props: {
          kpis: [
            { label: "Incidents", value: 238 },
            { label: "New Groups", value: 12 },
            { label: "Affected Countries", value: 31 },
          ],
        },
      },
      { component: "AnalyticsRow" },
      { component: "FeedList" },
    ],
  },
};
