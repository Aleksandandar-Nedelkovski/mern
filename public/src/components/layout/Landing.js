import React, { Component } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../img/Characters-07.png";

class Landing extends Component {
  render() {
    return (
      <div className="pt-24">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="tracking-loose w-full">BUILT</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Be Unstoppable In Life Together
            </h1>
            <p className="leading-normal text-2xl mb-8">
              BUILT BUILT BUILT BUILT BUILT BUILT
            </p>
            <Link to="/">Take Action</Link>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <img
              src={heroImage}
              alt="Main Image"
              className="w-full md:w-4/5 z-50"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
