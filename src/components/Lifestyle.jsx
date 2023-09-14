import React from "react";
import bgImg from "../assets/bg.png";
import Location from "./Location";

const Lifestyle = () => {
  return (
    <div
      className="flex flex-col h-full   text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-1"> Lifestyle AI</h2>
      <div className="flex flex-row ml-4">
        <Location />
      </div>
    </div>
  );
};

export default Lifestyle;
