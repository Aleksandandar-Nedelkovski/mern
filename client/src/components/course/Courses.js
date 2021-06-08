import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
// import Courses from "./Courses";
import CourseItem from "./CourseItem";
import Enrollments from "../enrollment/Enrollments";
import Spinner from "../layout/Spinner";

import { getCourses, listEnrolled } from "../../actions/course";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "90%",
    margin: "auto",
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: "#ffffff",
  },
  extraTop: {
    marginTop: theme.spacing(12),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  gridList: {
    width: "100%",
    minHeight: 200,
    padding: "16px 0 10px",
  },
  tile: {
    textAlign: "center",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
  },
  enrolledTitle: {
    color: "#efefef",
    marginBottom: 5,
  },
  action: {
    margin: "0 10px",
  },
  enrolledCard: {
    backgroundColor: "#616161",
  },
  divider: {
    marginBottom: 16,
    backgroundColor: "rgb(157, 157, 157)",
  },
  noTitle: {
    color: "lightgrey",
    marginBottom: 12,
    marginLeft: 8,
  },
}));

const Courses = ({
  getCourses,
  listEnrolled,
  // enrolled,
  course: { courses, loading },
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCourses();
    listEnrolled();
  }, [getCourses, listEnrolled]);

  const [enrolled] = useState({});
  // const [enrolled, setEnrolled] = useState({});
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Card className={`${classes.card} ${classes.enrolledCard}`}>
              <Typography
                variant="h6"
                component="h2"
                className={classes.enrolledTitle}
              >
                Courses you are enrolled in
              </Typography>
              {enrolled.length !== 0 ? (
                <Enrollments enrollments={enrolled} />
              ) : (
                <Typography variant="body1" className={classes.noTitle}>
                  No courses.
                </Typography>
              )}
            </Card>
            <Card className={classes.card}>
              <Typography variant="h5" component="h2">
                All Courses
              </Typography>
              <div className="courses">
                {courses.length !== 0 && courses.length !== enrolled.length ? (
                  courses.map((course) => (
                    <CourseItem key={course._id} course={course} />
                  ))
                ) : (
                  <Typography variant="body1" className={classes.noTitle}>
                    No new courses.
                  </Typography>
                )}
              </div>
            </Card>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Courses.propTypes = {
  listEnrolled: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  enrolled: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  enrolled: state.enrolled,
});

export default connect(mapStateToProps, {
  listEnrolled,
  getCourses,
})(Courses);
