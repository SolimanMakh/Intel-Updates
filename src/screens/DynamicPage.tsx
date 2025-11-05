import { useLoaderData, useSearchParams } from "react-router-dom";
import AppShell from "../ui/layout/AppShell";
import Grid from "../ui/layout/Grid";
import FiltersSidebar from "../ui/filters/FiltersSidebar";
import AnalyticsRow from "../ui/analytics/AnalyticsRow";
import FeedList from "../ui/feed/FeedList";
import KpiBanner from "../ui/analytics/KpiBanner";
import type { LoaderFunctionArgs } from "react-router-dom";
import { PAGE_SCHEMAS } from "../utils/schema";
import { MOCK_ITEMS } from "../data/mockItems";
import { applyFilters } from "../utils/filters";
import { buildCountryRanks, buildSectorsAnalytics } from "../utils/analytics";

export async function dynamicLoader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = params.page ?? "intel-updates";
  const schema = PAGE_SCHEMAS[page] ?? PAGE_SCHEMAS["intel-updates"];
  // Frontend-only: compute filtered data in loader
  const filtered = applyFilters(MOCK_ITEMS, url.searchParams);
  const sectors = buildSectorsAnalytics(filtered);
  const countries = buildCountryRanks(filtered);
  return { page, schema, filtered, sectors, countries };
}

export default function DynamicPage() {
  const { schema, filtered, sectors, countries } = useLoaderData() as any;
  // const [sp] = useSearchParams();

  return (
    <AppShell title={schema.title}>
      <Grid
        sidebar={<FiltersSidebar />}
        content={schema.layout.map((block: any, i: number) => {
          switch (block.component) {
            case "KpiBanner":
              return <KpiBanner key={i} kpis={block.props?.kpis ?? []} />;
            case "AnalyticsRow":
              return (
                <AnalyticsRow key={i} sectors={sectors} countries={countries} />
              );
            case "FeedList":
              return <FeedList key={i} items={filtered} />;
            default:
              return null;
          }
        })}
      />
    </AppShell>
  );
}
