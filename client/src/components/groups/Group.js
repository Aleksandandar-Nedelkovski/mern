import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserGroups, getCurrentProfile } from "../../actions/profile";
import Join from "./Join";

const Group = ({
  group,
  openLargeView,
  group: { _id, name, course, members, max_members },
}) => {
  return (
    <div className="card-row">
      <div className="profile-header">
        <h1 className="peer-text row-title"> {name} </h1>
        <p className="peer-text peer-small"> {course} </p>
        <h2 className="peer-text right-row-text">
          {" "}
          {members.length}/{max_members}{" "}
        </h2>
      </div>
      <div className="profile-button-group">
        <button className="btn-small" onClick={() => openLargeView(_id)}>
          {" "}
          More{" "}
        </button>
        <Join group={group} />
      </div>
    </div>
  );
};

Group.propTypes = {
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
  Group
);
