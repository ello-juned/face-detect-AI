import React from "react";
import bgImg from "../assets/bg.jpeg";
import { featureData } from "../common";
import { CircularProgressbar } from "react-circular-progressbar";

const Skin = ({ skinFeatures }) => {
  return (
    <div
      className="flex flex-col h-full text-white justify-between gap-2 p-2 w-full   bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl">Skin AI</h2>

      <div className="w-full  flex flex-row justify-center items-center text-center ">
        {featureData?.map((feature) => (
          <div
            key={feature.name}
            className="w-full  flex flex-col justify-center items-center text-center gap-8 p-5 "
          >
            {skinFeatures[feature?.name] && (
              <>
                <CircularProgressbar
                  value={skinFeatures[feature?.name]}
                  maxValue={5}
                  text={skinFeatures[feature?.name]}
                />
                <p className="text-2xl tracking-wider ">{feature?.label}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skin;
