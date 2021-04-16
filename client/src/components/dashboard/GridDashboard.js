import React from "react";
import { Link } from "react-router-dom";

export default function GridDashboard() {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="justify-center flex flex-wrap">
          <div className="">
            <div className="flex flex-wrap">
              <div className="flex flex-wrap">
                <Link to="/home-challenges">
                  <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                    <img
                      alt="..."
                      className="align-middle border-none max-w-full h-auto rounded-lg"
                      src={require("../../img/Slider/Hero-Image-2.jpg").default}
                    />
                  </div>
                </Link>
                <h5 className="text-xl font-semibold pb-4 text-center">
                  Home Challenges
                </h5>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <Link to="/events">
                  <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                    <img
                      alt="..."
                      className="align-middle border-none max-w-full h-auto rounded-lg"
                      src={
                        require("../../img/Characters/Characters-10.jpg")
                          .default
                      }
                    />
                  </div>
                </Link>
                <h5 className="text-xl font-semibold pb-4 text-center">
                  Family Fun Day
                </h5>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <Link to="/schedule">
                  <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                    <img
                      alt="..."
                      className="align-middle border-none max-w-full h-auto rounded-lg"
                      src={
                        require("../../img/Characters/Characters-09.jpg")
                          .default
                      }
                    />
                  </div>
                </Link>
                <h5 className="text-xl font-semibold pb-4 text-center">
                  Schedule
                </h5>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <Link to="/tickets">
                  <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                    <img
                      alt="..."
                      className="align-middle border-none max-w-full h-auto rounded-lg"
                      src={
                        require("../../img/Characters/Characters-07.jpg")
                          .default
                      }
                    />
                  </div>
                </Link>
                <h5 className="text-xl font-semibold pb-4 text-center">
                  Tickets
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
