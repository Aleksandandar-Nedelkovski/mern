import React, { Component } from "react";
import Slider from "react-slick";

import heroImage1 from "../../img/Slider/Hero-Image-1.jpg";
import heroImage2 from "../../img/Slider/Hero-Image-2.jpg";
import heroImage3 from "../../img/Slider/Hero-Image-3.jpg";
import heroImage4 from "../../img/Slider/Hero-Image-4.jpg";

export default class CenterMode extends Component {
  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <a href="/">
            {/* <img src={`${baseUrlImg}/Hero-Image-${i + 1}.jpg`} /> */}
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img alt="#" src={heroImage1} />
          </div>
          <div>
            <img alt="#" src={heroImage2} />
          </div>
          <div>
            <img alt="#" src={heroImage3} />
          </div>
          <div>
            <img alt="#" src={heroImage4} />
          </div>
        </Slider>
      </div>
    );
  }
}
