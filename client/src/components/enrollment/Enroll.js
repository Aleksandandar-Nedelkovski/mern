import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { createEnrollment } from "../../actions/enrollment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Enroll(props) {
  const [values, setValues] = useState({
    enrollmentId: "",
    error: "",
    redirect: false,
  });

  const clickEnroll = () => {
    createEnrollment(props.courseId);
    console.log("====================================");
    console.log(props.courseId);
    console.log("====================================");
  };

  if (values.redirect) {
    return <Redirect to={"/learn/" + values.enrollmentId} />;
  }

  return (
    <Button variant="contained" color="secondary" onClick={clickEnroll}>
      {" "}
      Enroll{" "}
    </Button>
  );
}

Enroll.propTypes = {
  createEnrollment: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, { createEnrollment })(Enroll);
