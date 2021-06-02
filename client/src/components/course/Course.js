import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getCourse,
  updateCourse,
  deleteCourse,
  enrollmentStats,
} from "../../actions/course";
import LessonForm from "./LessonForm";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Enroll from "./../enrollment/Enroll";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardMedia from "@material-ui/core/CardMedia";
import PeopleIcon from "@material-ui/icons/Group";
import CompletedIcon from "@material-ui/icons/VerifiedUser";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { CourseStyles } from "./CourseStyle";

const Course = ({
  getCourse,
  enrollmentStats,
  auth,
  course: { course, loading },
  match,
  history,
}) => {
  const classes = CourseStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCourse(match.params.courseId);
    enrollmentStats(match.params.courseId);
  }, [getCourse, enrollmentStats, match.params.courseId]);

  const publish = () => {
    let courseData = new FormData();
    courseData.append("published", true);
    updateCourse(courseData);
  };
  const imageUrl = require("../../img/logo.png").default;

  const handleClose = () => {
    setOpen(false);
  };

  const clickPublish = () => {
    if (course.lessons.length > 0) {
      setOpen(true);
    }
  };

  return loading || course === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/courses" className="btn">
        Back To Courses
      </Link>

      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={course.name}
            subheader={
              <div>
                <p className="text-black">
                  By {course.instructor[0].name} <br />
                </p>
                <span className={classes.category}>{course.category}</span>
              </div>
            }
            action={
              <>
                {!auth.loading && course.user === auth.user._id && (
                  <span className={classes.action}>
                    <Link to={"/teach/course/edit/" + course._id}>
                      <IconButton aria-label="Edit" color="secondary">
                        <Edit />
                      </IconButton>
                    </Link>
                    {!course.published ? (
                      <>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={clickPublish}
                        >
                          {course.lessons.length === 0
                            ? "Add atleast 1 lesson to publish"
                            : "Publish"}
                        </Button>
                        <button course={course} onClick={deleteCourse} />
                      </>
                    ) : (
                      <Button color="primary" variant="outlined">
                        Published
                      </Button>
                    )}
                  </span>
                )}
                {course.published && (
                  <div>
                    <span className={classes.statSpan}>
                      <PeopleIcon />
                      {/* {stats.totalEnrolled}  */}
                      enrolled{" "}
                    </span>
                    <span className={classes.statSpan}>
                      <CompletedIcon />
                      {/* {stats.totalCompleted} */}
                      completed{" "}
                    </span>
                  </div>
                )}
              </>
            }
          />
          <div className={classes.flex}>
            <CardMedia
              className={classes.media}
              image={imageUrl}
              title={course.name}
            />
            <div className={classes.details}>
              <Typography variant="body1" className={classes.subheading}>
                {course.description}
                <br />
              </Typography>

              {course.published && (
                <div className={classes.enroll}>
                  <Enroll courseId={course._id} history={history} />
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <CardHeader
              title={
                <Typography variant="h6" className={classes.subheading}>
                  Lessons
                </Typography>
              }
              subheader={
                <Typography variant="body1" className={classes.subheading}>
                  {course.lessons && course.lessons.length} lessons
                </Typography>
              }
              action={
                !auth.loading &&
                course.user === auth.user._id && (
                  <span className={classes.action}>
                    <LessonForm course={course._id} history={history} />
                  </span>
                )
              }
            />
            <List>
              {course.lessons &&
                course.lessons.map((lesson, index) => {
                  return (
                    <span key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{index + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={lesson.title} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </span>
                  );
                })}
            </List>
          </div>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Publish Course</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Publishing your course will make it live to students for
              enrollment.{" "}
            </Typography>
            <Typography variant="body1">
              Make sure all lessons are added and ready for publishing.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={publish} color="secondary" variant="contained">
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

Course.defaultProps = {
  showActions: true,
};

Course.propTypes = {
  getCourse: PropTypes.func.isRequired,
  enrollmentStats: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  enrollment: state.enrollment,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourse, enrollmentStats })(Course);
