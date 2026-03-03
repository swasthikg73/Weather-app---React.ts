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
            <p>{Math.round(day.temp.day)} °F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)} °F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)} °F</p>
          </div>
        ))}
      </Card>
    </div>
  );
};
