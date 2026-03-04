import axios from "axios";
import { weatherSchema } from "../schema/weatherSchema";

import { GeoCodeSchema } from "@/schema/geoCodeSchema";

const API_KEY = import.meta.env.VITE_API_KEY;


//Current day Weather
export const getWeather = async ({ lat, lon }: { lat: number, lon: number }) => {

    const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&APPID=${API_KEY}`);

    return weatherSchema.parse(res.data);  //This line validates data against the Zod schema (WeatherSchema).

    //In short:
    // ✅ If data matches the schema → it returns validated data
    // ❌ If data does NOT match → it throws an error
}


//Geo Code
export const getGeoCode = async (City: string) => {
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=1&appid=${API_KEY}`);
    return GeoCodeSchema.parse(res.data)
}

