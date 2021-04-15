import React, { Fragment } from "react";
import heroImage1 from "../../img/Slider/Hero-Image-1.jpg";
import heroImage2 from "../../img/Slider/Hero-Image-2.jpg";
import heroImage3 from "../../img/Slider/Hero-Image-3.jpg";
import heroImage4 from "../../img/Slider/Hero-Image-4.jpg";

export default function HomeChallenges() {
  return (
    <Fragment>
      <div className="container">
        <div>
          <img alt="#" src={heroImage1} />
        </div>
        <div>
          <div
            style={{
              height: 100,
              width: 300,
              display: "inline-block",
              margin: "0 1% 1% 0",
            }}
          >
            <img alt="#" src={heroImage2} />
          </div>
          <div
            style={{
              height: 100,
              width: 300,
              display: "inline-block",
              margin: "1%",
            }}
          >
            <img alt="#" src={heroImage3} />
          </div>
          <div
            style={{
              height: 100,
              width: 300,
              display: "inline-block",
              margin: "0 1% 1% 0",
            }}
          >
            <img alt="#" src={heroImage4} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
