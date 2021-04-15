import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
// import Experience from "./Experience";
// import Education from "./Education";
// import HomeChallenges from "./HomeChallenges";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import ProgressBar from "./ProgressBar";
import ProgressData from "./ProgressData";

const testData = [{ bgcolor: "#ff6900", completed: 63 }];

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead text-primary">
        <i className="fas fa-user" /> Welcome, {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          {/* <DashboardActions /> */}
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}
          <p className="text-primary">Current Progress</p>
          <ProgressData />
          {/* {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))} */}
          {/* <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div> */}
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
