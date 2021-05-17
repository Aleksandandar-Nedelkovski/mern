import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const GroupItem = ({ auth, group: { _id, user_groups }, showActions }) => {
  return (
    <div>
      {showActions && (
        <Fragment>
          <Link to={`/group/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {user_groups.length > 0 && (
              <span className="comment-count">{user_groups.length}</span>
            )}
          </Link>
        </Fragment>
      )}
    </div>
  );
};

GroupItem.defaultProps = {
  showActions: true,
};
GroupItem.propTypes = {
  group: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.auth,
});

export default connect(mapStateToProps)(GroupItem);
