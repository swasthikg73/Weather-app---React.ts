import { useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "./Card";
import { getWeather } from "../../API/Api";
import Cloud from "../../assets/Icons/cloud.svg";
import Uv from "../../assets/Icons/uv.svg";
import Wind from "../../assets/Icons/wind.svg";
import Pressure from "../../assets/Icons/pressure.svg";
import Sunrise from "../../assets/Icons/sunrise.svg";
import Sunset from "../../assets/Icons/sunset.svg";
import UpArrow from "../../assets/Icons/uparrow.svg";
import type { Cords } from "../../Types/types";

interface Props {
  cords: Cords;
}
export const AdditionalInfo = ({ cords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", cords],
    queryFn: () => getWeather({ lat: cords.lat, lon: cords.lon }),
  });

  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8">
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4 items-center">
            <span className="text-gray-500">{label}</span>
            <img src={Icon} className=" size-6 md:size-8 icons" alt="icons" />
          </div>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
};

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (value === "wind_deg")
    return (
      <img
        className="size-8 icons"
        src={UpArrow}
        style={{ transform: `rotate(${number}deg)` }}
        alt="icons"
      />
    );
  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
