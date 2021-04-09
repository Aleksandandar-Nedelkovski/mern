import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CarouselWithDots from "./CarouselWithDots";
import MultipleImagesCarousel from "./MultipleImagesCarousel";
import ResponsiveSlider from "./ResponsiveSlider";
import CenterMode from "./ThumbnailsSlider";
import LandingCards from "../landing-page/LandingCards";
import Team from "../landing-page/Team";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        {/*<div className="pt-24"> */}
        <CarouselWithDots />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <LandingCards />
        <ResponsiveSlider />
        <Team />
        <CenterMode />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
