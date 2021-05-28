import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "../../actions/auth";
import { getCurrentProfile } from "../../actions/profile";

const AdminDashboard = () => {
  return (
    <section className="dash">
      <h1>Admin Dashboard</h1>
    </section>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, getCurrentProfile })(
  AdminDashboard
);
