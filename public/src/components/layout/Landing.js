import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="tracking-loose w-full">BUILT</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              <b>B</b>e Unstoppable In Life Together
            </h1>
            <p className="leading-normal text-2xl mb-8">built is blah blah</p>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {/* <img className="w-full md:w-4/5 z-50" src="./img/hero-hk.png" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
