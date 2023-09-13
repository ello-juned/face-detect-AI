import React from "react";
import maleIcon from "../assets/maleIcon.avif";
import femalIcon from "../assets/femalIcon.avif";
import bgImg from "../assets/bg.jpeg";

const Face = (props) => {
  const { expressions, age, gender } = props; // descrtructing all props...

  //  show hide male/female icon based on gender...
  const isMale = gender === "male";

  return (
    <div
      className="flex flex-col   text-white justify-between gap-2 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ">Face AI</h2>

      <div className="flex flex-row">
        <div className="w-full h-[160px]    flex flex-col justify-center items-center text-center gap-4">
          {gender && (
            <>
              <img
                src={isMale ? maleIcon : femalIcon}
                alt="female"
                width={60}
                height={60}
                className="rounded-full"
              />
              <p className="text-xl tracking-wide">
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            </>
          )}
        </div>

        <div className="w-full h-[160px]    flex flex-col justify-center items-center text-center gap-10">
          {age && (
            <>
              <p>{age?.toFixed(1)}</p>
              <p className="text-xl  tracking-wide">Age</p>
            </>
          )}
        </div>

        <div className="w-full h-[160px]   flex flex-col justify-center items-center text-center gap-10">
          {expressions.length > 0 && (
            <>
              <p>{expressions}</p>
              <p className="text-xl tracking-wide">Expression</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face;
