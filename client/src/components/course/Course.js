import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCourse, updateCourse } from "../../actions/course";
import Spinner from "../layout/Spinner";
import NewLesson from "./NewLesson";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import PeopleIcon from "@material-ui/icons/Group";
import CompletedIcon from "@material-ui/icons/VerifiedUser";
import Enroll from "./../enrollment/Enroll";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

import DeleteCourse from "./DeleteCourse";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  card: {
    padding: "24px 40px 40px",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  details: {
    margin: "16px",
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  media: {
    height: 190,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "0.9em",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "0.2em",
    marginTop: 5,
  },
  action: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  statSpan: {
    margin: "7px 10px 0 10px",
    alignItems: "center",
    color: "#616161",
    display: "inline-flex",
    "& svg": {
      marginRight: 10,
      color: "#b6ab9a",
    },
  },
  enroll: {
    float: "right",
  },
}));

const Course = ({
  getCourse,
  updateCourse,
  auth: { user },
  course: {
    // _id,
    loading,
    course,
    lessons,
  },
  match,
}) => {
  useEffect(() => {
    getCourse(match.params.id);
  }, [getCourse, match.params.id]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({});
  console.log("====================================");
  console.log("Course", course);
  console.log("====================================");

  const imageUrl = require("../../img/logo.png").default;
  const clickPublish = () => {
    if (lessons.length > 0) {
      setOpen(true);
    }
  };

  const [values, setValues] = useState({
    title: "",
    content: "",
    resource_url: "",
  });

  const removeCourse = (course) => {
    setValues({ ...values, redirect: true });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => {
    const lesson = {
      title: values.title || undefined,
      content: values.content || undefined,
      resource_url: values.resource_url || undefined,
    };
    addLesson({ courseId: course._id }, lesson).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        course.addLesson(data);
        setValues({ ...values, title: "", content: "", resource_url: "" });
        setOpen(false);
      }
    });
  };

  const addLesson = (course) => {
    // setCourse(course);
  };

  const publish = () => {
    let courseData = new FormData();
    courseData.append("published", true);
    updateCourse(courseData, user._id);
  };

  return loading || course === null ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={course.name}
          subheader={
            <div>
              {/* <Link
                to={"/profile/" + course.instructor[0]._id}
                
              > */}
              <p className="text-black">By {course.instructor[0].name}</p>
              {/* </Link> */}
              <br />
              <span className={classes.category}>{course.category}</span>
            </div>
          }
          action={
            <>
              {user && user._id === course.instructor[0]._id && (
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
                      <DeleteCourse course={course} onRemove={removeCourse} />
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
                    <PeopleIcon /> {stats.totalEnrolled} enrolled{" "}
                  </span>
                  <span className={classes.statSpan}>
                    <CompletedIcon /> {stats.totalCompleted} completed{" "}
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
                <Enroll courseId={course._id} />
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
              user &&
              user._id === course.instructor[0].user &&
              !course.published && (
                <span className={classes.action}>
                  <NewLesson courseId={course._id} addLesson={addLesson} />
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
            Publishing your course will make it live to students for enrollment.{" "}
          </Typography>
          <Typography variant="body1">
            Make sure all lessons are added and ready for publishing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={publish} color="primary" variant="contained">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Course.propTypes = {
  getCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourse,
  updateCourse,
})(Course);
