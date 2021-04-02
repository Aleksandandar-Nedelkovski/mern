import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAuctions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <h2 className="w-full my-2 text-3xl text-gray-800">
              {" "}
              Welcome, {user.name}
            </h2>

            <p> You have not yet setup a profile, please add some info</p>
            <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <Link to="/create-profile">Create Profile</Link>
            </button>
          </div>
        );
      }
    }

    return (
      <section className="bg-gray-100 py-8 min-h-screen">
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Dashboard
          </h1>
          {dashboardContent}
        </div>
      </section>
    );
  }
}

Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
