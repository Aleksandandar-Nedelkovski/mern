import React from "react";

const Banner = () => {
  return (
    <div className="banner px-3 mx-auto flex flex-wrap flex-col items-center">
      <h1 className="my-4 text-4xl font-bold">
        <b className="banner-orange">B</b>e <b className="banner-yellow">U</b>
        nstoppable <b className="banner-blue">I</b>n{" "}
        <b className="banner-red">L</b>ife <b className="banner-orange">T</b>
        ogether
      </h1>
    </div>
  );
};

export default Banner;
