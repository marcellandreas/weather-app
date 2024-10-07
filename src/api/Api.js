import axios from "axios";

export const AxiosIntance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/weather`,
});
