import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../utils/api";

import Join from "./Join";
import { getUserGroups, getCurrentProfile } from "../../actions/profile";

const ViewGroup = ({ group, closeLargeView }) => {
  const { _id, name, description, members, course, max_members } = group;
  const host = members[0];

  const [hostProfile, setHostProfile] = useState({
    loading: true,
    success: false,
    profile: null,
  });
  const { loading, success, profile } = hostProfile;

  const getHostProfile = async (id) => {
    try {
      const res = await api.get(`api/profile/user/${id}`);

      setHostProfile({
        loading: false,
        success: true,
        profile: res.data,
      });
    } catch (err) {
      setHostProfile({
        loading: false,
        success: false,
        profile: null,
      });
    }
  };

  useEffect(() => {
    getHostProfile(host.user);
  }, [host.user]);
  return (
    <div className="card-md explore-group-card">
      <div className="profile-header">
        <h1 className="peer-text row-title"> {name} </h1>
        <p className="peer-text peer-small"> {course} </p>
        <h2 className="peer-text right-row-text">
          {" "}
          {members.length}/{max_members}{" "}
        </h2>
      </div>
      <div className="profile-info">
        {!loading && success ? (
          <div className="profile-header">
            <h1 className="explore-text">Hosted by {profile.user.name}</h1>
            <div className="explore-profile-group to-right">
              <img
                className="explore-avatar avatar-peer-small"
                src={profile.user.avatar}
                alt=""
              />
              <Link
                to={{
                  pathname: `/profile/${profile._id}`,
                  state: {
                    goBack: "/groups",
                  },
                }}
              >
                <button className="btn-small">Profile</button>
              </Link>
            </div>
          </div>
        ) : (
          <Fragment>
            <h2 className="profile-text2"> Loading Host Profile </h2>
          </Fragment>
        )}
        <h2 className="profile-text2">{description}</h2>
      </div>
      <div className="profile-button-group">
        <button className="btn-small" onClick={() => closeLargeView(_id)}>
          Close
        </button>
        <Join group={group} />
      </div>
    </div>
  );
};

ViewGroup.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  // group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, { getCurrentProfile, getUserGroups })(
  ViewGroup
);
