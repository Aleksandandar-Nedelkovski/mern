import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    year,
    courses,
    buddies,
    user: { name },
  },
}) => (
  <div className="profile-about bg-dark p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
        <p>{bio}</p>
        <p>{year}</p>
        {courses.map((course, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {course}
          </div>
        ))}
        <div className="line" />
      </Fragment>
    )}
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {buddies}
      {/* {buddues.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check" /> {skill}
        </div>
      ))} */}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
