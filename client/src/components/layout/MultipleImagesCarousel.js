import React, { Component } from "react";
import Slider from "react-slick";

import heroImage1 from "../../img/Slider/Hero-Image-1.jpg";
import heroImage2 from "../../img/Slider/Hero-Image-2.jpg";
import heroImage3 from "../../img/Slider/Hero-Image-3.jpg";
import heroImage4 from "../../img/Slider/Hero-Image-4.jpg";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <div>
        <h2> Multiple items </h2>

        <Slider {...settings}>
          <div>
            <img src={heroImage1} />
            <img src={heroImage2} />
            <img src={heroImage3} />
          </div>
        </Slider>
      </div>
    );
  }
}
