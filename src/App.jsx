import { useEffect, useState } from "react";
import loadingsvg from "./assets/loading2.svg";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloud,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import Loading from "./pages/loading";
import { AxiosIntance } from "./api/Api";

const APIkey = `0221035d6f27d88840959f655f6409d0`;

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("London");
  const [query, setQuery] = useState("");
  const [animate, setanimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query !== "") {
      setLocation(query);
    }
    // select
    const input = document.querySelector("input");

    // if input value is empty
    if (input === "") {
      setanimate(true);
      setTimeout(() => {
        setanimate(false);
      }, 500);
    }

    input.value = "";
  };

  useEffect(() => {
    // Loading
    setLoading(true);

    AxiosIntance.get(`?q=${location}&units=metric&appid=${APIkey}`)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          // set loading
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // Error Massage
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);

    // clear
    return () => {
      clearTimeout(timer);
    };
  }, [errorMsg]);

  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloud />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }
  // date onject

  const date = new Date();

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center px-4 lg:px-0 ">
        <form
          onSubmit={handleSubmit}
          className={`${
            animate ? "animate-shake" : "animate-none"
          }  h-16 bg-black/30 w-full max-w-[400px] rounded-full backdrop-blur-[32px] mb-3`}
        >
          <div className="h-full relative flex items-center justify-between p-2 ">
            <input
              onChange={(e) => handleInput(e)}
              className="flex-1 bg-transparent outline-none placeholder:text-white  text-white text-[15px] font-light pl-6 h-full "
              type="text"
              placeholder="Search by city or country"
            />

            <button className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-10 rounded-full flex justify-center items-center transition">
              <IoMdSearch className="text-2xl text-white " />
            </button>
          </div>
        </form>
        {errorMsg && (
          <div className="text-lg font-bold text-center text-white bg-gray-400/20 p-2 min-w-[400px] mb-3 rounded-full">{`${errorMsg.response.data.message}`}</div>
        )}
        <div className="w-full bg-black/20 max-w-[400px] min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-4 px-6 ">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <img src={loadingsvg} alt="" />
            </div>
          ) : (
            <div>
              {/* Card Header */}
              <div className=" flex items-center gap-x-5 ">
                <div className="text-[87px]">{icon}</div>
                <div>
                  {/* Name */}
                  <div className="text-2xl font-semibold ">
                    {data.name}, {data.sys.country}
                  </div>
                  {/* date */}
                  <div>
                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                    {date.getUTCFullYear()}
                  </div>
                </div>
              </div>
              {/* Card Nody */}
              <div className="my-20 ">
                <div className="flex justify-center items-center ">
                  {/* Temp */}
                  <div className="text-[144px] leading-none font-light ">
                    {parseInt(data.main.temp)}
                  </div>
                  {/* celcius */}
                  <div className="text-4xl">
                    <TbTemperatureCelsius />
                  </div>
                </div>
                {/* weather desc */}
                <div className="capitalize text-center">
                  {data.weather[0].description}
                </div>
              </div>
              {/* Card FOoter */}
              <div className="max-w-[378px] mx-auto flex flex-col gap-y-6 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-[20px]">
                      <BsEye />
                    </div>
                    <div>
                      Visibility{" "}
                      <span className="ml-2">{data.visibility / 1000}km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-[20px]">
                      <BsThermometer />
                    </div>
                    <div className="flex">
                      Feels like
                      <div className="flex ml-2">
                        {parseInt(data.main.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-[20px]">
                      <BsWater />
                    </div>
                    <div>
                      Humidity
                      <span className="ml-2">{data.main.humidity}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-[20px]">
                      <BsWind />
                    </div>
                    <div>
                      Wind <span className="ml-2">{data.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
