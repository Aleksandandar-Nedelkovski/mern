import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
// import ProfileExperience from "./ProfileExperience";
// import ProfileEducation from "./ProfileEducation";
import { getProfileById, deleteAccount } from "../../actions/profile";
// import DashboardActions from "../dashboard/DashboardActions";
// import Experience from "../dashboard/Experience";
// import Education from "../dashboard/Education";

const Profile = ({
  getProfileById,
  deleteAccount,
  profile: { profile },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-orange">
            Back To Profiles
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <div className="my-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus" /> Delete My Account
                  </button>
                </div>
              )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
  Profile
);
