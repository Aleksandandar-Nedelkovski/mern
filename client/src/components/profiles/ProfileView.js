import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileView = ({ profile }) => {
  const { user, bio, year, courses } = profile;
  const { avatar } = user;

  let courseElements = courses.map((course, index) => (
    <li key={index} className="profile-text">
      {" "}
      {course}{" "}
    </li>
  ));

  let editProfile = () => {
    profile.initiateEditing();
  };

  return (
    <div className="profile-view">
      <div className="card-md profile-card">
        <div className="profile-header">
          <h1 className="profile-text"> Welcome, {user.name} </h1>
          <img className="avatar" src={avatar} alt="" />
        </div>
        <div className="profile-info">
          <h2 className="profile-text"> {bio} </h2>
          <h2 className="profile-text2"> Year: {year} </h2>
          <ul className="course-list"> {courseElements} </ul>
        </div>
      </div>
      <button className="btn-dash" onClick={editProfile}>
        {" "}
        Edit Profile{" "}
      </button>
      <Link
        to={{
          pathname: "/newgroup",
          state: {
            goBack: "/home",
          },
        }}
      >
        <button className="btn-dash btn-create">Create Group</button>
      </Link>
      <Link to="/studyview">
        <button className="btn-dash btn-peer">Study</button>
      </Link>
    </div>
  );
};
ProfileView.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileView);
