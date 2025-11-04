import TopSectorsCard from "./TopSectorsCard";
import TopCountriesCard from "./TopCountriesCard";
export default function AnalyticsRow({
  sectors,
  countries,
}: {
  sectors: any;
  countries: any[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <TopSectorsCard data={sectors} />
      <TopCountriesCard data={countries} />
    </div>
  );
}
