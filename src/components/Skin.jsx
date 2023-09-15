import React, { useState } from "react";
import bgImg from "../assets/bg.png";
import { featureData } from "../common";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Skin = ({ skinFeatures }) => {
  const [activeCard, setActiveCard] = useState(0);

  const handleCardClick = (index) => {
    setActiveCard(index === activeCard ? -1 : index);
  };

  return (
    <div
      className="flex flex-col h-full text-white justify-between w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl m-1 ml-3 flex flex-row items-center">
        <MdOutlineArrowDropDown size={35} /> Skin AI
      </h2>

      <div className="w-full flex flex-row justify-center items-center text-center gap-6">
        {featureData?.map((feature, index) => (
          <div
            key={feature.name}
            className={`w-full m-3 cursor-pointer p-1 flex flex-col justify-center items-center text-center gap-1 ${
              skinFeatures[feature.name] !== "" && activeCard === index
                ? "bg-blue-400 bg-opacity-30 border-2 border-sky-600 rounded-xl"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {skinFeatures[feature?.name] && (
              <>
                <CircularProgressbar
                  value={skinFeatures[feature?.name]}
                  maxValue={5}
                  text={skinFeatures[feature?.name]}
                  strokeWidth={5}
                  className="p-5"
                />
                <p className="text-2xl text-primaryTextColor font-semibold">
                  {feature?.label.toUpperCase()}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skin;
