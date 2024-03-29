import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileInvite = ({ group, join, deny }) => {
  const { _id, name, course, members, max_members } = group;

  return (
    <div className="card-row invite-card">
      <div className="profile-header">
        <h1 className="peer-text row-title">You've been invited to {name}</h1>
        <p className="peer-text peer-small">{course}</p>
        <h1 className="peer-text right-row-text">
          {members.length}/{max_members}
        </h1>
      </div>
      <div className="profile-button-group">
        <button
          className="btn-buddy btn-buddy-accept"
          onClick={() => join(_id)}
        >
          Accept
        </button>
        <button
          className="btn-buddy btn-buddy-decline"
          onClick={() => deny(_id)}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

ProfileInvite.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.profile,
});

export default connect(mapStateToProps)(ProfileInvite);
