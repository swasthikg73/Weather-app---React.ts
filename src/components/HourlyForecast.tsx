import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../API/Api";
import { Card } from "./cards/Card";
import { WeatherIcon } from "./WeatherIcon";
import type { Cords } from "../Types/types";

interface Props {
  cords: Cords;
}

export const HourlyForecast = ({ cords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", cords],
    queryFn: () => getWeather({ lat: cords.lat, lon: cords.lon }),
  });
  return (
    <div>
      <Card
        title="Hourly Forecast (48 Hours)"
        childrenClassName="flex gap-14 overflow-y-scroll ">
        {data.hourly.map((hour) => (
          <div key={hour.dt} className="flex flex-col  items-center p-2">
            <p className="whitespace-nowrap">
              {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <WeatherIcon path={`${hour.weather[0].icon}`} />
            <p>{Math.round(fahrenheitToCelsius(hour.temp))}°C</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}
