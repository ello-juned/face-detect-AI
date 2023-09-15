import React, { useState } from "react";
import bgImg from "../assets/bg.png";
import Location from "./Location";
import { dummyData } from "../common";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Lifestyle = () => {
  const [locationData, setLocationData] = useState(null);
  const [city, setCity] = useState(""); // Use state to store the city name
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
          locationData &&
          dummyData.map((data, index) => (
            <div className="flex flex-col justify-between items-center text-center gap-3 p-2">
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
