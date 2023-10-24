import React, { useEffect, useState, useRef } from "react";
import landing from "../landing.png";
import js from "../js.png";
import python from "../file.png";

import Aos from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import CodeEditor from "./CodeEditor";
import Footer from "./Footer";
import LanguagesCard from "./LanguagesCard";

const Main = () => {
  const containerStyle = {
    backgroundImage: `url(${landing})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
  };
  useEffect(() => {
    Aos.init({
      mirror: true,
    });
  }, []);

  const services = [
    {
      title: "Python",
      icon: python,
    },
    {
      title: "JavaScript",
      icon: js,
    },
  ];
  return (
    <>
      <div className="h-screen w-screen" style={containerStyle} id="home">
        <div className="pl-24" data-aos="fade-right">
          <h1
            className="text-8xl text-slate-300 pt-72  animate__animated animate__slideInLeft  "
            style={{
              fontFamily: "Anek Bangla, sans-serif",
              letterSpacing: "1px",
            }}
          >
            Welcome to CodeRealm
          </h1>
          <p
            className="text-5xl text-slate-300 pl-2 animate__animated animate__fadeInUp "
            style={{ fontFamily: "Anek Bangla, sans-serif" }}
          >
            Best place to test your coding skills
          </p>
        </div>
      </div>
      <CodeEditor />
      <h1
        className=" text-slate-900 mt-40 m-auto pl-14  "
        style={{
          fontFamily: "Anek Bangla, sans-serif",
          letterSpacing: "1px",
        }}
        data-aos="fade-down"
      >
        <div className="text-4xl">Supported Languages</div>
        <p className="text-2xl">
          Since it is a docker based code execution we will add more languages
          in the future
        </p>
      </h1>

      <div className="mt-10 flex  gap-10 w-full m-14">
        {services.map((service, index) => (
          <LanguagesCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default Main;
