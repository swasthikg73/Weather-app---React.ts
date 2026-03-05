import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../API/Api";
import { Card } from "./cards/Card";
import { WeatherIcon } from "./WeatherIcon";
import type { Cords } from "../Types/types";

interface Props {
  cords: Cords;
}
export const DailyForecast = ({ cords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", cords],
    queryFn: () => getWeather({ lat: cords.lat, lon: cords.lon }),
  });

  return (
    <div>
      <Card
        title="Daily Forecast"
        childrenClassName="flex flex-col justify-between">
        {data?.daily?.map((day) => (
          <div
            key={day.dt}
            className="grid grid-cols-5 items-center text-center py-2">
            <p>
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <WeatherIcon
              path={`${day.weather[0].icon}`}
              className="size-8 lg:ml-40"
            />
            <p>{Math.round(fahrenheitToCelsius(day.temp.day))}°C</p>
            <p className="text-gray-500/75">
              {Math.round(fahrenheitToCelsius(day.temp.min))}°C
            </p>
            <p className="text-gray-500/75">
              {Math.round(fahrenheitToCelsius(day.temp.max))}°C
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
};

function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}
