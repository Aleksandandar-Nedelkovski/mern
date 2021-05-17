import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";

const ProfileView = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {}, [getProfileById]);
  const { user, bio, year, courses } = profile;
  const { avatar } = user;

  let courseElements = courses.map((course, index) => (
    <li key={index} className="profile-text">
      {" "}
      {course}{" "}
    </li>
  ));

  // const profileContext = useContext(ProfileContext);

  // let editProfile = () => {
  //   profileContext.initiateEditing();
  // };

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
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};

ProfileView.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(ProfileView);
