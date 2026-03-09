import { DailyForecast } from "./components/cards/DailyForecast";
import { HourlyForecast } from "./components/cards/HourlyForecast";
import { CurrentWeather } from "./components/cards/CurrentWeather";
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
import { Sidebar } from "./components/Sidebar/Sidebar";

import hamburger from "./assets/Icons/hamburger.svg";
import SideBarSkeleton from "./components/skeletons/SidebarSkeleton";
import { LightDarkToggle } from "./components/LightDarkToggle";

function App() {
  const [coordinates, setCords] = useState<Cords>({ lat: 0, lon: 0 });
  const [location, setLocation] = useState("Delhi");
  const [mapType, setMapType] = useState("clouds_new");

  const [isSibebarOpen, setSidebarOpen] = useState(false);

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
      <div
        className={`flex flex-col gap-8 p-4 lg:p-8 w-full ${isSibebarOpen ? "lg:w-[calc(100vw-var(--sidebar-width))]" : ""} transition-all duration-700 `}>
        <div className="flex  md:flex-row items-start md:items-center justify-between mx-2 md:mx-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 m-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-xs lg:text-2xl font-semibold">Location :</h1>
              <LocationDropdowns
                location={location}
                setLocation={setLocation}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-xs md:text-md lg:text-2xl font-semibold">
                Map Type :
              </h1>
              <MapTypesDropdowns mapType={mapType} setMapType={setMapType} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LightDarkToggle />
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:mt-0 z-1000">
              <img
                src={hamburger}
                className="size-4 lg:size-6 icons cursor-pointer"
                alt=""
              />
            </button>
          </div>
        </div>

        {/* Map Components */}
        <div className="relative">
          <Map cords={cords} onMapClick={onMapClick} mapType={mapType} />
          <MapLegend mapType={mapType} />
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather cords={cords} />
          </Suspense>

          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForecast cords={cords} />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4">
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast cords={cords} />
          </Suspense>

          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalInfo cords={cords} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<SideBarSkeleton />}>
        <Sidebar
          cords={cords}
          isSibebarOpen={isSibebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </Suspense>
    </>
  );
}

export default App;
