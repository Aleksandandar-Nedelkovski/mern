import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//landing page components
import CarouselWithDots from "./CarouselWithDots";
import Banner from "./Banner";
import LandingCards from "./LandingCards";
import ResponsiveSlider from "./ResponsiveSlider";
import Team from "./Team";
import CenterMode from "./CenterMode";
import GridLanding from "./GridLanding";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Banner />
      <CarouselWithDots />
      <GridLanding />
      <LandingCards />
      <ResponsiveSlider />
      <Team />
      <CenterMode />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
