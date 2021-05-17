import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import auth from "./../auth/auth-helper";
import Courses from "./../course/Courses";
import Enrollments from "../enrollment/Enrollments";
import { listPublishedCourses } from "../../actions/course";

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

const AllCourses = ({ listPublishedCourses, auth: { user }, course }) => {
  useEffect(() => {
    listPublishedCourses();
  }, [listPublishedCourses]);
  const classes = useStyles();
  // const jwt = auth.isAuthenticated();
  const [courses] = useState([]);
  const [enrolled] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    // const signal = abortController.signal;
    // listPublished(signal).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setCourses(data);
    //   }
    // });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <div className={classes.extraTop}>
      {auth.isAuthenticated().user && (
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
      )}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {courses.length !== 0 && courses.length !== enrolled.length ? (
          <Courses courses={courses} common={enrolled} />
        ) : (
          <Typography variant="body1" className={classes.noTitle}>
            No new courses.
          </Typography>
        )}
      </Card>
    </div>
  );
};

AllCourses.propTypes = {
  listPublishedCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  course: state.course,
});

export default connect(mapStateToProps, { listPublishedCourses })(AllCourses);
