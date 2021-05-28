import React, { Fragment } from "react";

export default function About() {
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white rounded px-6 py-8 shadow-md">
            <h1 className="large">About</h1>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={
                      require("../../img/Characters/Characters-13.png").default
                    }
                  />
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={
                      require("../../img/Characters/Characters-11.png").default
                    }
                  />
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                  <img
                    alt="..."
                    className="align-middle border-none max-w-full h-auto rounded-lg"
                    src={
                      require("../../img/Characters/Characters-12.png").default
                    }
                  />
                </div>
              </div>
            </div>

            {/* <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"> */}

            <p className="lead">
              BUILT is a family program specifically designed to incorporate
              healthy behaviors into children’s daily routines. Research shows
              eating well, sleeping well, and being physically active has
              tremendous benefits on young people’s brains and behavior. This
              program is fun and is designed to reward children for
              incorporating routines into their lives with their families while
              experiencing the value for themselves.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
