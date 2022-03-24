import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getHour();
  }, [getCurrentProfile]);
  const [hour, setHour] = useState(false);

  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    setHour({
      hour,
    });
  };
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <div>
          <h1 className="large">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" />{" "}
            {hour < 12
              ? `Good morning, ${user && user.name}`
              : `Good afternoon, ${user && user.name}`}
          </p>
          <p className="lead"> Welcome to Week 1</p>
        </div>
        {profile !== null ? (
          <Fragment>
            Dashboard 
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
