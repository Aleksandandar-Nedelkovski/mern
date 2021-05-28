import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getEnrollment } from "../../actions/enrollment";
import PropTypes from "prop-types";

function Enrollment({ getEnrollment, enrollment: { enrollment }, match }) {
  useEffect(() => {
    getEnrollment(match.params.enrollmentId);
  }, [getEnrollment, match.params.enrollmentId]);

  return <div>{enrollment.course}</div>;
}

Enrollment.propTypes = {
  getEnrollment: PropTypes.func.isRequired,
  enrollment: PropTypes.object.isRequired,
  enrollmentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  enrollment: state.enrollment,
});

export default connect(mapStateToProps, { getEnrollment })(Enrollment);
