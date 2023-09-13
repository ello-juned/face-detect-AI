import React from "react";
import CardLoader from "./CardLoader";
import maleIcon from "../assets/maleIcon.avif";
import femalIcon from "../assets/femalIcon.avif";
import bgImg from "../assets/bg.jpeg";

const Face = (props) => {
  const { expressions, age, gender } = props; // descrtructing all props...

  //  show hide male/female icon based on gender...
  const isMale = gender === "male";

  return (
    <div
      className="flex flex-col  text-white justify-between gap-2 w-full bg-cover bg-center bg-no-repeat p-2 "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ">Face AI</h2>

      <div className="flex flex-row">
        <div className="w-full h-[180px]   p-4  flex flex-col justify-center items-center text-center gap-4">
          {gender && (
            <>
              <img
                src={isMale ? maleIcon : femalIcon}
                alt="female"
                width={60}
                height={60}
                className="rounded-full"
              />
              <p className="text-xl"> {gender}</p>
            </>
          )}
          {!gender && <CardLoader />}
        </div>

        <div className="w-full h-[180px]     p-4 flex flex-col justify-center items-center text-center gap-4">
          {age && (
            <>
              <p>{age?.toFixed(1)}</p>
              <p className="text-xl mt-2">Age</p>
            </>
          )}
          {!age && <CardLoader />}
        </div>

        <div className="w-full h-[180px]   p-4  flex flex-col justify-center items-center text-center gap-4">
          {expressions.length > 0 && (
            <>
              <p>{expressions}</p>
              <p className="text-xl mt-2">Expression</p>
            </>
          )}
          {expressions.length <= 0 && <CardLoader />}
        </div>
      </div>
    </div>
  );
};

export default Face;
