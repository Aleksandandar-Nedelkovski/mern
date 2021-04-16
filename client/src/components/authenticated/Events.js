import React, { Fragment } from "react";
import MyCalendar from "../common/Calendar";

export default function Events() {
  return (
    <Fragment>
      <h1 className="large">Events</h1>
      <div>
        <MyCalendar />
      </div>
      <section>
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                The next Family Fun Day
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Zoom link to Synchronous Family Fun Day
              </p>

              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Zoom Link"
              />
              <div className="mt-12">
                <h2 className="font-semibold text-4xl text-blueGray-600">
                  The next parent call
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Call-in number
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center">
        <h1 className="large font-bold"></h1>
        <p className="lead"></p>
      </div>
    </Fragment>
  );
}
