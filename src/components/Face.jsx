import React from "react";
import maleIcon from "../assets/maleIcon.png";
import femaleIcon from "../assets/femaleicon.png";
import bgImg from "../assets/bg.png";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { expressionEmojis } from "../common";

// angry, disgusted, fearful, happy, neutral, sad, surprised

const Face = (props) => {
  const { expressions, age, gender } = props; // descrtructing all props...
  //  show hide male/female icon based on gender...
  const isMale = gender === "male";

  return (
    <div
      className="flex flex-col h-full  text-white justify-around gap-10 p-2 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h2 className="text-2xl ml-1 absolute top-1  flex flex-row items-center">
        <MdOutlineArrowDropDown size={35} /> Face AI
      </h2>

      <div className="flex flex-row p-1 ">
        <div className="w-full  flex flex-col justify-between gap-2  items-center  text-center ">
          {gender && (
            <>
              <img
                src={isMale ? maleIcon : femaleIcon}
                alt="female"
                width={100}
                height={100}
                className=""
              />
              <p className="text-2xl tracking-wide text-primaryTextColor font-semibold ">
                {gender.toUpperCase()}
              </p>
            </>
          )}
        </div>

        <div className="w-full   flex flex-col justify-around  items-center text-center ">
          {age && (
            <>
              <p className="text-4xl mt-2">{Math.round(age?.toFixed(1))}</p>
              <p className="text-2xl  tracking-wide text-primaryTextColor  mt-16 font-semibold ">
                AGE
              </p>
            </>
          )}
        </div>

        <div className="w-full  flex flex-col justify-around items-center text-center">
          {expressions.length > 0 && (
            <>
              <p className="text-2xl mt-2">
                {expressions}{" "}
                <span className="text-xl">
                  {expressionEmojis[expressions[0]]}
                </span>
              </p>
              <p className="text-2xl tracking-wide mt-16 text-primaryTextColor font-semibold ">
                EXPRESSION
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face;
