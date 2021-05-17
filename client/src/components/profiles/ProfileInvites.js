import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileInvite from "./ProfileInvite";
import api from "../../utils/api";
import { getCurrentProfile, getUserGroups } from "../../actions/profile";
import { setAlert } from "../../actions/alert";

const ProfileInvites = ({
  getUserGroups,
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getUserGroups();
  }, [getCurrentProfile, getUserGroups]);

  const [groupsState, setGroups] = useState({
    groups: null,
    loading: true,
    success: true,
  });

  const { groups, loading, success } = groupsState;

  const getGroups = async () => {
    try {
      const res = await api.get("api/profile/invites");

      setGroups({
        groups: res.data,
        loading: false,
        success: true,
      });
    } catch (err) {
      setGroups({
        groups: null,
        loading: false,
        success: false,
      });
    }
  };

  useEffect(() => {
    getGroups();
  }, [profile]);

  const joinRequest = async (groupid) => {
    try {
      const res = await api.put(`api/profile/invites/${groupid}`);

      setAlert(res.data.msg, "success");
    } catch (err) {
      setAlert(err.response.data.msg, "danger");
    }
  };

  const denyRequest = async (groupid) => {
    try {
      const res = await api.delete(`api/profile/invites/${groupid}`);

      setAlert(res.data.msg, "success");
    } catch (err) {
      setAlert(err.response.data.msg, "danger");
    }
  };

  const join = async (groupid) => {
    await joinRequest(groupid);
    getCurrentProfile();
  };

  const deny = async (groupid) => {
    await denyRequest(groupid);
    getCurrentProfile();
  };

  return (
    !loading && (
      <Fragment>
        {success ? (
          <Fragment>
            <h2> Failure loading invites </h2>
          </Fragment>
        ) : (
          <div className="group-cards">
            {groups.map((group) => (
              <ProfileInvite
                key={group._id}
                group={group}
                join={join}
                deny={deny}
              />
            ))}
          </div>
        )}
      </Fragment>
    )
  );
};

ProfileInvites.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.profile,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, getUserGroups })(
  ProfileInvites
);
