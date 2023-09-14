import React from "react";
import bgImg from "../assets/bg.jpeg";
import { featureData } from "../common";
import { CircularProgressbar } from "react-circular-progressbar";

const Skin = ({ skinFeatures }) => {
  return (
    <div
      className="flex flex-col text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl">Skin Analysis</h2>

      <div className="w-full h-[160px] flex flex-row justify-center items-center text-center gap-4 mt-2">
        {featureData?.map((feature) => (
          <div
            key={feature.name}
            className="w-full h-[160px] flex flex-col justify-center items-center text-center gap-10"
          >
            {skinFeatures[feature?.name] && (
              <>
                <CircularProgressbar
                  value={skinFeatures[feature?.name]}
                  maxValue={5}
                  text={skinFeatures[feature?.name]}
                />
                <p className="text-xl tracking-wide">{feature?.label}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skin;
