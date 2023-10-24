import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
// import avator from "avator.png";
import { fadeIn, textVariant } from "../utils/motion";

const LanguagesCard = ({ index, title, icon }) => {
  return (
    <>
      <Tilt className="xs:w-[250px] shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] border-2 rounded-xl w-1/4 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-300">
        <motion.div
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          className="w-full green-pink-gradient  rounded-[20px] shadow-slate-700"
        >
          <div
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
          >
            <img
              src={icon}
              alt="web-development"
              className="w-16 h-16 object-contain shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
            />
            <h3 className="text-white text-[20px] font-bold text-center">
              {title}
            </h3>
          </div>
        </motion.div>
      </Tilt>
    </>
  );
};

export default LanguagesCard;
