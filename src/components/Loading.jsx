import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-2 bg-white  justify-center items-center text-center w-screen h-screen absolute top-0 right-0">
      <div className=" flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-green-500 "></div>
      </div>
      <h2 className="text-xl  text-gray-400 ">Please wait...</h2>
      <p className="text-sm  from-gray-200 mt-4 ">setting your camera</p>
    </div>
  );
};

export default Loading;
