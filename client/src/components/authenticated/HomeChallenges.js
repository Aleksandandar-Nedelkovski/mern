import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import YoutubeEmbed from "../common/YoutubeEmbed";
import Pagination from "./Pagination";

const HomeChallenges = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        {/* <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2"> */}
        <div className="bg-white rounded px-6 py-8 shadow-md">
          <h1 className="x-large text-center">
            <i className="fas fa-wrench" /> Home Challenges
          </h1>
          <p>Week 1</p>
          <YoutubeEmbed embedId="TGhNoDPb5eM" />
        </div>
        <br />
        <br />
        <br />
        <Pagination />
        {/* </div> */}
      </div>
    </Fragment>
  );
};

HomeChallenges.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(HomeChallenges);
