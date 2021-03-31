import React, { Component } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../img/Characters-07.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

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
              alt="Main Hero"
              className="w-full md:w-4/5 z-50"
            />
          </div>
        </div>
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
