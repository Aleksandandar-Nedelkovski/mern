import React, { Component } from "react";
import Slider from "react-slick";

import heroImage1 from "../../img/Slider/Hero-Image-1.jpg";
import heroImage2 from "../../img/Slider/Hero-Image-2.jpg";
import heroImage3 from "../../img/Slider/Hero-Image-3.jpg";
import heroImage4 from "../../img/Slider/Hero-Image-4.jpg";

export default class CarouselWithDots extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        <div>
          <img src={heroImage1} />
        </div>
        <div>
          <img src={heroImage2} />
        </div>
        <div>
          <img src={heroImage3} />
        </div>
        <div>
          <img src={heroImage4} />
        </div>
      </Slider>
    );
  }
}
