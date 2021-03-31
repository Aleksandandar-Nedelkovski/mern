import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAuctions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h4>Welcome, {}</h4>
      </div>
    );
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);
