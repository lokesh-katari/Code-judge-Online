import React from "react";
import { ArrowUpRight } from "lucide-react";
const Submissions = () => {
  return (
    <>
      {" "}
      <div className="flex max-w-3xl mx-auto border-slate-950 border-solid border-4 flex-col items-center rounded-md  md:flex-row w-full">
        <div className="h-full w-full md:h-[200px] md:w-[300px]">
          {/* // className="h-full w-full rounded-md object-cover" */}
          <div className="h-full w-full flex rounded-md object-cover flex-col">
            <div className="text-8xl p-2 flex justify-center items-center h-3/4">
              20
            </div>
            <span className=" flex justify-center items-center">Solved!</span>
          </div>
        </div>
        <div>
          <div className="p-4 flex flex-col ">
            <h1 className="inline-flex items-center text-lg font-semibold">
              Easy :
            </h1>
            <h1 className="inline-flex items-center text-lg font-semibold">
              Medium :
            </h1>
            <h1 className="inline-flex items-center text-lg font-semibold">
              Hard :
            </h1>

            <div className="mt-3 flex items-center space-x-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submissions;
