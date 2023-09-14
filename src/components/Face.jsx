import React from "react";
import maleIcon from "../assets/maleIcon.avif";
import femalIcon from "../assets/femalIcon.avif";
import bgImg from "../assets/bg.png";

const Face = (props) => {
  const { expressions, age, gender } = props; // descrtructing all props...
  //  show hide male/female icon based on gender...
  const isMale = gender === "male";

  return (
    <div
      className="flex flex-col h-full  text-white justify-around gap-10 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-1 ">Face AI</h2>

      <div className="flex flex-row p-3">
        <div className="w-full  flex flex-col justify-center items-center text-center  gap-10">
          {gender && (
            <>
              <img
                src={isMale ? maleIcon : femalIcon}
                alt="female"
                width={80}
                height={80}
                className="rounded-full"
              />
              <p className="text-xl tracking-wide">
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            </>
          )}
        </div>

        <div className="w-full  flex flex-col justify-between items-center text-center ">
          {age && (
            <>
              <p className="text-4xl">{Math.round(age?.toFixed(1))}</p>
              <p className="text-xl  tracking-wide">Age</p>
            </>
          )}
        </div>

        <div className="w-full  flex flex-col justify-between items-center text-center">
          {expressions.length > 0 && (
            <>
              <p className="text-lg">{expressions}</p>
              <p className="text-xl tracking-wide mt-3">Expression</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face;
