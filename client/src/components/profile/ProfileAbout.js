import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => (
  <div className="profile-about bg-dark p-2">
    <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
    <p className="lead text-primary">{bio}</p>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
