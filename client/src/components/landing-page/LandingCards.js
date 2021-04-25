import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import hero from "../../img/Slider/Hero-Image-3.jpg";
// import character2 from "../../img/Characters/Characters-12.png";
// import character3 from "../../img/Characters/Characters-13.png";
// import character1 from "../../img/Characters/Characters-11.png";
import workingWithUsPhoto from "../../img/Characters/Characters-10.jpg";

export default function LandingCards() {
  return (
    <Fragment>
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <img src={workingWithUsPhoto} alt="work-with-us" />
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
    </Fragment>
  );
}
