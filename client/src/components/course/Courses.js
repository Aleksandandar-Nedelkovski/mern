import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Coursetem from "./CourseItem";
import { getCourses } from "../../actions/course";

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

const Courses = ({ getCourses, course: { courses } }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const classes = useStyles();
  const [enrolled] = useState([]);

  return (
    <div className={classes.extraTop}>
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {courses.length !== 0 && courses.length !== enrolled.length ? (
          <div className="courses">
            {courses.map((course) => (
              <Coursetem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <Typography variant="body1" className={classes.noTitle}>
            No new courses.
          </Typography>
        )}
      </Card>
    </div>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourses })(Courses);
