import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";

import GridDashboard from "./GridDashboard";
import ProfileInvites from "../profile/ProfileInvites";
import BuddyRequests from "../buddy/BuddyRequests";
import BuddyList from "../buddy/BuddyList";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getHour();
  }, [getCurrentProfile]);
  const [refreshBuddies, setRefreshBuddies] = useState(false);
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
          {/* <Link to="/admin/dashboard">
            <button className="btn btn-orange">Admin</button>
          </Link>
          <Link to="/admin/groups">
            <button className="btn btn-orange">Groups</button>
          </Link>
          <Link to="/admin/study">
            <button className="btn btn-orange">Study</button>
          </Link> */}
        </div>
        {profile !== null ? (
          <Fragment>
            <ProfileInvites />
            <div className="dashboard-buddies">
              <BuddyRequests setRefreshBuddies={setRefreshBuddies} />
              <BuddyList
                refreshBuddies={refreshBuddies}
                setRefreshBuddies={setRefreshBuddies}
              />
            </div>
            <GridDashboard />
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
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
