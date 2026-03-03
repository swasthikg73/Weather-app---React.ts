import axios from "axios";
import { weatherSchema } from "../schema/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;


//Current day Weather
export const getWeather = async ({ lat, lon }: { lat: number, lon: number }) => {


    const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&APPID=1e83049831e7c8aab189fc9368340f7f`);
    //https://api.openweathermap.org/data/3.0/onecall?lat=36&lon=86&exclude={part}&appid=c1c014a532a4196e5085c635ab75a36e
    //one day
    //const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1e83049831e7c8aab189fc9368340f7f`)

    //console.log(res.data);

    console.log(res.data);

    return weatherSchema.parse(res.data);  //This line validates data against the Zod schema (WeatherSchema).

    //In short:
    // ✅ If data matches the schema → it returns validated data
    // ❌ If data does NOT match → it throws an error
}

//5 day - hourly next
// export const getWeatherForecast = async ({ lat, lon }: { lat: number, lon: number }) => {

//     const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1e83049831e7c8aab189fc9368340f7f`)

//     return ForecastSchema.parse(res.data)
// }