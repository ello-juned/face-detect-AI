import React, { useState, useEffect } from "react";
import bgImg from "../assets/bg.png";
import Location from "./Location";
import { MdOutlineArrowDropDown } from "react-icons/md";
import axios from "axios";
import { getWeatherDescription } from "../common";

const Lifestyle = () => {
  const [locationData, setLocationData] = useState(null);
  const [city, setCity] = useState(""); // Use state to store the city name
  const [weatherData, setWeatherData] = useState([
    { title: "AIR QUALITY", value: "", description: "Unhealthy" },
    { title: "UV INDEX", value: "", description: "Very High" },
  ]); // Use state to store weather data

  useEffect(() => {
    if (city) {
      const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const uvIndex = response.data.current.uv;
          const airQuality = response.data.current.wind_degree;

          // Get descriptions based on UV and air quality values
          const { uvDescription, airQualityDescription } =
            getWeatherDescription(uvIndex, airQuality);

          const newData = [
            {
              title: "AIR QUALITY",
              value: airQuality,
              description: airQualityDescription,
            },
            { title: "UV INDEX", value: uvIndex, description: uvDescription },
          ];

          setWeatherData(newData);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [city]);

  return (
    <div
      className="flex flex-col h-full text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-1  flex flex-row items-center">
        <MdOutlineArrowDropDown size={35} /> Lifestyle AI
      </h2>
      <div className="flex flex-row justify-between w-[85%] m-auto">
        <Location
          locationData={locationData}
          setLocationData={setLocationData}
          city={city}
          setCity={setCity}
        />
        {city &&
          weatherData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center text-center gap-3 p-2"
            >
              <>
                <h2 className="text-xl text-primaryTextColor font-semibold">
                  {data.title}
                </h2>
                <h2 className="text-4xl ">{data.value}</h2>
                <h2 className="text-2xl ">{data.description}</h2>
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Lifestyle;
