import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { createEnrollment } from "../../actions/enrollment";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Enroll({ createEnrollment, course: { course } }) {
  const [formData] = useState({
    enrollmentId: "",
    course: course._id,
    student: course.user,
    lessonsArray: [],
    enrolled: Date.now,
    redirect: false,
  });

  const { student, lessonsArray, enrolled } = formData;

  const clickSubmit = (e) => {
    e.preventDefault();
    createEnrollment(course._id, formData);
  };

  return (
    <Button variant="contained" color="secondary" onClick={clickSubmit}>
      Enroll{" "}
    </Button>
  );
}

Enroll.propTypes = {
  createEnrollment: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { createEnrollment })(Enroll);
