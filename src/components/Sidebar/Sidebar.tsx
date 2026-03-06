import { getAirPollution } from "@/API/Api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "../cards/Card";
import { Slider } from "@/components/ui/slider";

interface Props {
  cords: { lat: number; lon: number };
}

export const Sidebar = ({ cords }: Props) => {
  return (
    <div className="fixed w-90 bg-sidebar h-screen shadow-md z-1000 top-0 right-0 py-8 px-4">
      <AirPollution cords={cords} />
    </div>
  );
};

function AirPollution({ cords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", cords],
    queryFn: () => getAirPollution(cords),
  });

  return (
    <div className="flex flex-col gap-4 justify-center">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>

      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutant =
          airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];
        const max = pollutant["Very Poor"].min;
        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="flex flex-col hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!">
            <div className="flex justify-between">
              <span className="text-lg font-bold capitalize">{key}</span>
              <span className="text-lg font-semibold ">{value}</span>
            </div>
            <Slider min={0} disabled />
          </Card>
        );
      })}
    </div>
  );
}

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};
