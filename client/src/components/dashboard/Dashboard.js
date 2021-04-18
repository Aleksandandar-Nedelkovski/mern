import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
// import ProgressBar from "./ProgressBar";
// import ProgressData from "./ProgressData";
import GridDashboard from "./GridDashboard";

// const testData = [{ bgcolor: "#ff6900", completed: 63 }];

const Dashboard = ({
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
        <div>
          <h1 className="large">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Good afternoon, {user && user.name}
          </p>
          <p className="lead"> Welcome to Week 1</p>
        </div>
        {profile !== null ? (
          <Fragment>
            <GridDashboard />
            {/* <ProgressData /> */}
            {/* {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))} */}
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile">
              <button className="btn btn-orange">Create Profile</button>
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
