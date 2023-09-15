import React from "react";
import bgImg from "../assets/bg.png";
import { featureData } from "../common";
import { CircularProgressbar } from "react-circular-progressbar";

const Skin = ({ skinFeatures }) => {
  return (
    <div
      className="flex flex-col h-full text-white justify-between  w-full   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-3">Skin AI</h2>

      <div className="w-full  flex flex-row  justify-center items-center text-center gap-6 ">
        {featureData?.map((feature) => (
          <div
            key={feature.name}
            className="w-full m-5  flex flex-col justify-center items-center text-center gap-3"
          >
            {skinFeatures[feature?.name] && (
              <>
                <CircularProgressbar
                  value={skinFeatures[feature?.name]}
                  maxValue={5}
                  text={skinFeatures[feature?.name]}
                  strokeWidth={5}
                  className=" p-4"
                />
                <p className="text-2xl tracking-wider text-primaryTextColor font-semibold ">
                  {feature?.label}
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
