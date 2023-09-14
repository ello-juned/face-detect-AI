import React from "react";
import bgImg from "../assets/bg.png";
import Location from "./Location";
import { dummyData } from "../common";

const Lifestyle = () => {
  return (
    <div
      className="flex flex-col h-full text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-1">Lifestyle AI</h2>
      <div className="flex flex-row justify-between ml-4 ">
        <Location />
        {dummyData.map((data, index) => (
          <div className="flex flex-col justify-between items-center text-center gap-3 p-2">
            <>
              <h2 className="text-2xl text-primaryTextColor font-semibold">
                {data.title}
              </h2>
              <h2 className="text-2xl tracking-wide">{data.value}</h2>
              <h2 className="text-2xl tracking-wide">{data.description}</h2>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lifestyle;
