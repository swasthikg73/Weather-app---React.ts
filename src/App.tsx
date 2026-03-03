import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { CurrentWeather } from "./components/CurrentWeather";
import { AdditionalInfo } from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Cords } from "./Types/types";

function App() {
  const [cords, setCords] = useState<Cords>({ lat: 12.8855, lon: 74.8388 });

  const onMapClick = (lat: number, lon: number) => {
    setCords({ lat: lat, lon: lon });
  };

  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="md:grid grid-cols-2">
          <CurrentWeather cords={cords} />
          <Map cords={cords} onMapClick={onMapClick} />
        </div>

        <HourlyForecast cords={cords} />
        <DailyForecast cords={cords} />
        <AdditionalInfo cords={cords} />
      </div>
    </>
  );
}

export default App;
