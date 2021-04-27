import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserGroups } from "../../actions/profile";

import StudyView from "./StudyView";

const Study = ({ getUserGroups, group }) => {
  const { user_groups_loading, user_groups } = group;
  useEffect(() => {
    getUserGroups();
  }, []);

  return user_groups_loading ? (
    <Fragment>Loading</Fragment>
  ) : (
    <Fragment>
      {user_groups.length > 0 ? (
        <StudyView />
      ) : (
        <div className="studyview-wrapper">
          <h1 className="study-text study-header">
            {" "}
            Looks like you're not in a group. Join or create one!{" "}
          </h1>
          <Link to="/admin/groups">
            <button className="btn btn-dark">Explore</button>
          </Link>{" "}
          <Link
            to={{
              pathname: `/admin/newgroup`,
              state: {
                goBack: `/admin/study`,
              },
            }}
          >
            <button className="btn btn-orange">Create group</button>
          </Link>
        </div>
      )}
    </Fragment>
  );
};
Study.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, {
  getUserGroups,
})(Study);
