import React from "react";
import bgImg from "../assets/bg.jpeg";

const Skin = ({ skinFeatures }) => {
  const { skinColor, freckles, wrinkles } = skinFeatures;
  console.log("skinColor", skinColor);
  return (
    <div
      className="flex flex-col text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl">Skin Analysis</h2>

      <div className="w-full h-[160px] flex flex-row justify-center items-center text-center gap-4">
        {/* Add skin color information */}
        <div className="w-full h-[160px]    flex flex-col justify-center items-center text-center gap-10">
          {skinColor && (
            <>
              <p className="text-lg">{skinColor}</p>
              <p className="text-xl tracking-wide">Skin Color</p>
            </>
          )}
        </div>

        {/* Add freckles information */}
        <div className="w-full h-[160px]    flex flex-col justify-center items-center text-center gap-10">
          {freckles && (
            <>
              <p className="text-lg">{freckles}</p>
              <p className="text-xl tracking-wide">Freckles</p>
            </>
          )}
        </div>

        {/* Add wrinkles information */}
        <div className="w-full h-[160px]    flex flex-col justify-center items-center text-center gap-10">
          {wrinkles && (
            <>
              <p className="text-lg">{wrinkles}</p>
              <p className="text-xl tracking-wide">Wrinkles</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skin;
