import React, { Fragment } from "react";
import hero from "../../img/Slider/Hero-Image-3.jpg";
export default function LandingCards() {
  return (
    <Fragment>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <img
                  alt="..."
                  className="align-middle border-none max-w-full h-auto rounded-lg"
                  src={
                    require("../../img/Characters/Characters-07.jpg").default
                  }
                />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                What We Are About
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                BUILT is a family program specifically designed to incorporate
                healthy behaviors into children’s daily routines. Research shows
                eating well, sleeping well, and being physically active has
                tremendous benefits on young people’s brains and behavior.
              </p>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="hero"
                  src={hero}
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  ></svg>
                  <h4 className="text-xl font-bold text-black">
                    What You Can Expect
                  </h4>
                  <p className="text-md font-light mt-2 text-gray-500">
                    This program is fun and is designed to reward children for
                    incorporating routines into your lives with your family
                    while experiencing the value for yourselves.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
