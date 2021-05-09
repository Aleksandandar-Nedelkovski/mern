import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
// import api from "../../utils/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StudyMember = ({ userid, kick, isHost }) => {
  const [profileState] = useState({
    loading: true,
    exists: false,
    profile: {
      user: {},
    },
  });

  // const getProfile = async () => {
  //   try {
  //     const res = await api.get(`../api/profile/user/${userid}`);

  //     setProfile({
  //       loading: false,
  //       exists: true,
  //       profile: res.data,
  //     });
  //   } catch (err) {
  //     setProfile({
  //       loading: false,
  //       exists: false,
  //       profile: null,
  //     });
  //   }
  // };

  const { profile, loading, exists } = profileState;

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const { _id, user } = profile;
  const { name, avatar } = user;

  return loading ? (
    <Fragment>
      <h2 className="study-text">Loading</h2>
    </Fragment>
  ) : (
    <Fragment>
      {exists ? (
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
        </div>
      ) : (
        <Fragment>
          <h2 className="study-text">Error loading profile</h2>
        </Fragment>
      )}
    </Fragment>
  );
};

StudyMember.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps)(StudyMember);
