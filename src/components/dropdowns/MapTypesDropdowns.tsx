import type { Dispatch, SetStateAction } from "react";

interface Props {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
}

export const MapTypesDropdowns = ({ mapType, setMapType }: Props) => {
  return (
    // <Select value={mapType} onValueChange={(value) => setMapType(value)}>
    //   <SelectTrigger className="w-[180px] ">
    //     <SelectValue />
    //   </SelectTrigger>
    //   <SelectContent className="z-1001">
    //     <SelectGroup>
    //       {mapTypes.map((type, idx) => (
    //         <SelectItem key={idx} value={mapType} className="">
    //           {type}
    //         </SelectItem>
    //       ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>

    <select
      name=""
      id=""
      className="bg-zinc-900 text-white border-2 p-1 w-45 rounded-md decoration-0"
      value={mapType}
      onChange={(e) => setMapType(e.target.value)}>
      {mapTypes.map((type, i) => (
        <option
          className="capitalize"
          key={i}
          value={type}
          onClick={() => setMapType(type)}>
          {type.split("_")[0]}
        </option>
      ))}
    </select>
  );
};

const mapTypes = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
