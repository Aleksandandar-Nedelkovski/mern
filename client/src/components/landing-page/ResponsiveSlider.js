import React, { Component } from "react";
import Slider from "react-slick";

import heroImage1 from "../../img/Slider/Hero-Image-1.jpg";
import heroImage2 from "../../img/Slider/Hero-Image-2.jpg";
import heroImage3 from "../../img/Slider/Hero-Image-3.jpg";
import heroImage4 from "../../img/Slider/Hero-Image-4.jpg";

export default class ResponsiveSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <h3>photo 1</h3>
            <img src={heroImage1} alt="hero-image1" />
          </div>
          <div>
            <h3>photo 2</h3>
            <img src={heroImage2} alt="hero-image2" />
          </div>
          <div>
            <h3>photo 2</h3>
            <img src={heroImage3} alt="hero-image3" />
          </div>
          <div>
            <h3>photo 2</h3>
            <img src={heroImage4} alt="hero-image4" />
          </div>
        </Slider>
      </div>
    );
  }
}
