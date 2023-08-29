import React from "react";

const Main = () => {
  const backgroundStyle = {
    background: "hsla(236, 100%, 8%, 1)",
    background:
      "linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)",
    background:
      "-moz-linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)",
    background:
      "-webkit-linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)",
    filter:
      'progid: DXImageTransform.Microsoft.gradient(startColorstr="#000328", endColorstr="#00458E", GradientType=1)',
  };

  return (
    <>
      <div className="h-screen w-screen" style={backgroundStyle}>
        <h1 className="text-7xl text-slate-200 font-sans font-semibold justify-center items-center flex pt-60">
          the Best place to test your coding skills
        </h1>
      </div>
    </>
  );
};

export default Main;
