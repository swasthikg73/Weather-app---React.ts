import clsx from "clsx";

interface Props {
  path: string;
  className?: string;
}

export const WeatherIcon = ({ path, className }: Props) => {
  return (
    <img
      className={clsx("size-10 lg:size-14", className)}
      src={`https://openweathermap.org/payload/api/media/file/${path}.png`}
      alt="weather-icon"
    />
  );
};
