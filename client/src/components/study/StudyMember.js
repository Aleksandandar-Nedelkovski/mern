import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserGroups, getCurrentProfile } from "../../actions/profile";
import { loadGroups } from "../../actions/group";
const StudyMember = ({
  getCurrentProfile,
  loadGroups,
  profile: { profile },
  auth: { user },
  group,
  userid,
  kick,
  isHost,
}) => {
  const { user_groups_loading, user_groups } = group;
  const {} = user;
  const { _id, name, avatar } = user;
  console.log("====================================");
  console.log("StudyMember group", group);
  console.log("====================================");

  console.log("====================================");
  console.log("StudyMember user", user);
  console.log("====================================");

  useEffect(() => {
    getCurrentProfile();
    loadGroups();
  }, [getCurrentProfile, loadGroups]);
  const [profileState, setProfile] = useState({
    loading: true,
    exists: false,
    profile: {
      user: {},
    },
  });

  const getProfile = async () => {
    try {
      const res = await api.get(`../api/profile/user/${userid}`);

      setProfile({
        loading: false,
        exists: true,
        profile: res.data,
      });
    } catch (err) {
      setProfile({
        loading: false,
        exists: false,
        profile: null,
      });
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <div className="study-member">
        <img className="study-avatar" src={avatar} alt="" />
        <h2 className="study-text study-text-profile">{name}</h2>
        <div className="profile-buddy-buttongroup">
          {profile.user._id !== userid && (
            <Fragment>
              <Link
                to={{
                  pathname: `/profile/${_id}`,
                  state: {
                    goBack: `/studyview`,
                  },
                }}
              >
                <button className="study-btn-profile btn-buddy-profile">
                  Profile
                </button>
              </Link>

              {isHost && (
                <button
                  className="study-btn-profile btn-buddy-decline"
                  onClick={() => kick(userid)}
                >
                  Kick
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>{" "}
    </Fragment>
  );
};

StudyMember.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getUserGroups,
  loadGroups,
})(StudyMember);
