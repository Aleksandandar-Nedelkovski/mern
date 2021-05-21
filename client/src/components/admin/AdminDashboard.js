import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileView from "../profiles/ProfileView";
import CreateProfile from "../profiles/CreateProfile";
import BuddyRequests from "../buddy/BuddyRequests";
import BuddyList from "../buddy/BuddyList";
import ProfileInvites from "../profiles/ProfileInvites";

import { loadUser } from "../../actions/auth";
import { getCurrentProfile } from "../../actions/profile";

const AdminDashboard = ({
  loadUser,
  getCurrentProfile,
  auth: { loading },
  profile: { profile_exists, profile, editing_profile },
}) => {
  const profileLoading = loading;

  const [refreshBuddies, setRefreshBuddies] = useState(false);

  useEffect(() => {
    loadUser();
    getCurrentProfile();
  }, [loadUser, getCurrentProfile]);

  return (
    <section className="dash">
      {loading || profileLoading ? (
        <h2> Loading </h2>
      ) : !profile_exists ? (
        <CreateProfile prompt="Looks like you don't have a profile yet. Let's create one!" />
      ) : (
        <div className="dashboard-col">
          {editing_profile ? (
            <CreateProfile prompt="Edit Your Profile" profile={profile} />
          ) : (
            <ProfileView profile={profile} />
          )}
          <ProfileInvites />
          <div className="dashboard-buddies">
            <BuddyRequests setRefreshBuddies={setRefreshBuddies} />
            <BuddyList
              refreshBuddies={refreshBuddies}
              setRefreshBuddies={setRefreshBuddies}
            />
          </div>
        </div>
      )}
    </section>
  );
};

AdminDashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.profile,
});

export default connect(mapStateToProps, { loadUser, getCurrentProfile })(
  AdminDashboard
);
