import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import { AdditionalInfo } from "./components/cards/AdditionalInfo";
import Map from "./components/Map/Map";
import { Suspense, useState } from "react";
import type { Cords } from "./Types/types";
import { LocationDropdowns } from "./components/dropdowns/LocationDropdowns";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "./API/Api";

import { MapTypesDropdowns } from "./components/dropdowns/MapTypesDropdowns";
import { MapLegend } from "./components/Map/MapLegend";
import { CurrentSkeleton } from "./components/skeletons/CurrentSkeleton";
import { DailySkeleton } from "./components/skeletons/DailySkeleton";
import { AdditionalInfoSkeleton } from "./components/skeletons/AdditionalInfoSkeleton";
import { HourlySkeleton } from "./components/skeletons/HourlySkeleton";

function App() {
  const [coordinates, setCords] = useState<Cords>({ lat: 0, lon: 0 });
  const [location, setLocation] = useState("Delhi");
  const [mapType, setMapType] = useState("clouds_new");

  const { data } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeoCode(location),
  });
  const onMapClick = (lat: number, lon: number) => {
    setCords({ lat: lat, lon: lon });
    setLocation("custom");
  };

  const cords =
    location === "custom"
      ? coordinates
      : { lat: data?.[0].lat ?? 28.61, lon: data?.[0].lon ?? 77.21 };
  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="flex gap-8 m-4">
          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Location :</h1>
            <LocationDropdowns location={location} setLocation={setLocation} />
          </div>

          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Map Type :</h1>
            <MapTypesDropdowns mapType={mapType} setMapType={setMapType} />
          </div>
        </div>
        <div className="relative">
          <Map cords={cords} onMapClick={onMapClick} mapType={mapType} />
          <MapLegend mapType={mapType} />
        </div>

        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather cords={cords} />
        </Suspense>

        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast cords={cords} />
        </Suspense>

        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast cords={cords} />
        </Suspense>

        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo cords={cords} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
