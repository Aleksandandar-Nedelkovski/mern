import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { addEnrollment } from "../../actions/course";
import { connect } from "react-redux";

function Enroll({ addEnrollment, courseId, course: { course }, history }) {
  const [formData] = useState({
    courseId,
    studentId: course.user,
    lessonsArray: course.lessons,
    enrolled: Date.now,
  });

  const clickSubmit = (e) => {
    e.preventDefault();
    addEnrollment(courseId, formData, history);
  };

  return (
    <Button variant="contained" color="secondary" onClick={clickSubmit}>
      Enroll
    </Button>
  );
}

Enroll.propTypes = {
  addEnrollment: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { addEnrollment })(Enroll);
