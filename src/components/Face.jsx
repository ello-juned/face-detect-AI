import React from "react";
import maleIcon from "../assets/maleIcon.png";
import femalIcon from "../assets/femaleIcon.png";
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
      <h2 className="text-2xl ml-1 absolute top-1 ">Face AI</h2>

      <div className="flex flex-row p-1 ">
        <div className="w-full  flex flex-col justify-between gap-2  items-center  text-center ">
          {gender && (
            <>
              <img
                src={isMale ? maleIcon : femalIcon}
                alt="female"
                width={100}
                height={100}
                className=""
              />
              <p className="text-2xl tracking-wide text-primaryTextColor ">
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            </>
          )}
        </div>

        <div className="w-full   flex flex-col justify-between  items-center text-center ">
          {age && (
            <>
              <p className="text-3xl">{Math.round(age?.toFixed(1))}</p>
              <p className="text-2xl  tracking-wide text-primaryTextColor ">
                Age
              </p>
            </>
          )}
        </div>

        <div className="w-full  flex flex-col justify-between items-center text-center">
          {expressions.length > 0 && (
            <>
              <p className="text-2xl">{expressions}</p>
              <p className="text-2xl tracking-wide mt-3 text-primaryTextColor ">
                Expression
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face;
