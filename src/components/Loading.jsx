import React from "react";
import loader from "../assets/loader.gif";

const Loading = () => {
  return (
    <div className="flex flex-col bg-white  justify-center items-center text-center w-screen h-screen absolute top-0 right-0">
      <img src={loader} alt="loader" className="w-2/12" />
      <h2 className="text-2xl text-gray-500 ">Please wait...</h2>
      <p className="text-lg from-neutral-400 mt-4">configuring your camera.</p>
    </div>
  );
};

export default Loading;
