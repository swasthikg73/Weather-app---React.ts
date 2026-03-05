import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../API/Api";
import { Card } from "./cards/Card";
import { WeatherIcon } from "./WeatherIcon";
import type { Cords } from "../Types/types";

interface Props {
  cords: Cords;
}

export const CurrentWeather = ({ cords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", cords],
    queryFn: () => getWeather({ lat: cords.lat, lon: cords.lon }),
  });
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col gap-6 items-center ">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center ">
          {Math.round(fahrenheitToCelsius(data?.current?.temp))}°C
        </h2>

        <WeatherIcon
          path={data.current.weather[0].icon}
          className="size-20 ml-6"
        />

        <h3 className="capitalize text-xl text-center">
          {data.current.weather[0].description}
        </h3>
      </div>

      <div className="flex flex-col gap-2 ">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold text-center">
          {/* <span className="text-4xl font-normal"> Time : </span> */}
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <p>{Math.round(fahrenheitToCelsius(data.current.feels_like))}°C</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p>{Math.round(data.current.humidity)}%</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{data.current.wind_speed} mph</p>
        </div>
      </div>
    </Card>
  );
};

function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}
