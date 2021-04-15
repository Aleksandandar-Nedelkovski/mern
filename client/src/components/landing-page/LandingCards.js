import React from "react";
import { Link } from "react-router-dom";
import hero from "../../img/Slider/Hero-Image-3.jpg";
import character2 from "../../img/Characters/Characters-12.png";
import character3 from "../../img/Characters/Characters-13.png";
import character1 from "../../img/Characters/Characters-11.png";
import workingWithUsPhoto from "../../img/Characters/Characters-10.jpg";

export default function LandingCards() {
  return (
    <>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <img src={character1} />

                    {/* <i className="fas fa-award"></i> */}
                  </div>
                  <h6 className="text-xl text-black font-semibold">
                    Awarded Agency
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Divide details about your product or agency work into parts.
                    A paragraph describing a feature will be enough.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <img src={character2} />

                    {/* <i className="fas fa-award"></i> */}
                  </div>
                  <h6 className="text-xl text-black font-semibold">
                    Free Revisions
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Keep you user engaged by providing meaningful information.
                    Remember that by this time, the user is curious.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <img src={character3} />

                    {/* <i className="fas fa-award"></i> */}
                  </div>
                  <h6 className="text-xl text-black font-semibold">
                    Verified Company
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <img src={workingWithUsPhoto} />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Working with us is a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus possimus ipsa vitae sequi? Magnam quaerat est ipsum
                minus, accusamus voluptates accusantium perferendis cupiditate
                quidem. Cumque veniam quidem saepe debitis similique.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, nam et dolorem, qui esse iure iste perspiciatis optio
                asperiores, quae repudiandae velit ad ratione cumque soluta
                consequatur maxime animi impedit!
              </p>
              <Link to="/" className="font-bold text-blueGray-700 mt-8">
                Check Something Out!
              </Link>
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
                    Top Notch Services
                  </h4>
                  <p className="text-md font-light mt-2 text-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
