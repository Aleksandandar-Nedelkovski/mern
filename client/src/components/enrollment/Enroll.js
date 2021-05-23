import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { createEnrollment } from "../../actions/enrollment";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 500,
  },
}));

function Enroll(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    enrollmentId: "",
    error: "",
    redirect: false,
  });
  console.log("====================================");
  console.log("props", props);
  console.log("====================================");
  const clickEnroll = () => {
    createEnrollment(props.courseId);
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
  courseId: PropTypes.string.isRequired,
};

export default Enroll;
