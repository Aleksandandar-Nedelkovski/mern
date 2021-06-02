import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Info from "@material-ui/icons/Info";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { CardContent } from "@material-ui/core";
import { getCourse } from "../../actions/course";

import Spinner from "../layout/Spinner";
import { learnStyles } from "./LearnStyles";

const Enrollment = ({
  getCourse,
  course: { course, enrollments, category, loading },
  match,
}) => {
  const classes = learnStyles();
  const [values, setValues] = useState({
    error: "",
    drawer: -1,
  });
  const [totalComplete, setTotalComplete] = useState(0);

  useEffect(() => {
    getCourse(match.params.courseId);
  }, [getCourse, match.params.courseId]);

  console.log("====================================");
  // console.log("course lessons", course.lessons);
  console.log("====================================");

  const selectDrawer = (index) => (event) => {
    setValues({ ...values, drawer: index });
  };

  const totalCompleted = (lessons) => {
    let count = lessons.reduce((total, lessonStatus) => {
      return total + (lessonStatus.complete ? 1 : 0);
    }, 0);
    setTotalComplete(count);
    return count;
  };
  // const markComplete = () => {
  //   let count = totalCompleted(lessonStatus);
  // };

  const imageUrl = require("../../img/logo.png").default;

  return loading || enrollments === null ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            onClick={selectDrawer(-1)}
            className={
              values.drawer === -1 ? classes.selectedDrawer : classes.unselected
            }
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary={"Course Overview"} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.unselected}>
          <ListSubheader component="div" className={classes.subhead}>
            Lessons
          </ListSubheader>
          {course.lessons.map((lesson, index) => (
            <ListItem
              button
              key={index}
              onClick={selectDrawer(index)}
              className={
                values.drawer === index
                  ? classes.selectedDrawer
                  : classes.unselected
              }
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>{index + 1}</Avatar>
              </ListItemAvatar>
              {console.log(lesson[index])}
              <ListItemText primary={lesson[index]} />
              <ListItemSecondaryAction>
                {lesson.complete ? (
                  <CheckCircle className={classes.check} />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={
                <div className={classes.progress}>
                  <span>{totalComplete}</span> out of{" "}
                  <span>{course.lessons.length}</span> completed
                </div>
              }
            />
          </ListItem>
        </List>
      </Drawer>
      {values.drawer === -1 && (
        <Card className={classes.card}>
          <CardHeader
            title={course.name}
            subheader={
              <div>
                By {course.instructor[0].name}
                <span className={classes.category}>{category}</span>
              </div>
            }
            action={
              totalComplete === course.enrollments[0].lessonStatus.length && (
                <span className={classes.action}>
                  <Button variant="contained" color="secondary">
                    <CheckCircle /> &nbsp; Completed
                  </Button>
                </span>
              )
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
            />
            <List>
              {course.lessons &&
                course.lessons.map((lesson, i) => {
                  return (
                    <span key={i}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{i + 1}</Avatar>
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
      )}

      {values.drawer !== -1 && (
        <>
          <Typography variant="h5" className={classes.heading}>
            {course.name}
          </Typography>
          <Card className={classes.card}>
            <CardHeader
              title={course.lessons[values.drawer].title}
              action={
                <Button
                  // onClick={markComplete}
                  // variant={
                  //   enrollments.lessonStatus[values.drawer].complete
                  //     ? "contained"
                  //     : "outlined"
                  // }
                  color="secondary"
                >
                  {/* {enrollments.lessonStatus[values.drawer].complete
                    ? "Completed"
                    : "Mark as complete"} */}
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body1" className={classes.para}>
                {course.lessons[values.drawer].content}
              </Typography>
            </CardContent>
            <CardActions>
              <a
                href={course.lessons[values.drawer].resource_url}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="contained" color="primary">
                  Resource Link
                </Button>
              </a>
            </CardActions>
          </Card>
        </>
      )}
    </div>
  );
};

Enrollment.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourse })(Enrollment);
