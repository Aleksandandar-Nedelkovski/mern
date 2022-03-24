import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { getCourse, updateCourse } from "../../actions/course";
import { CourseStyles } from "./CourseStyle";

function EditCourse({
  getCourse,
  auth: { user },
  course: { course },
  match,
  history,
}) {
  useEffect(() => {
    getCourse(match.params.id);
  }, [getCourse, match.params.id]);

  const classes = CourseStyles();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [resourceUrl] = useState("");
  const [setLessons] = useState("");

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

 
  const handleLessonChange = (name, index) => (event) => {
    const lessons = course.lessons;
    lessons[index][name] = event.target.value;
    setLessons({ ...course, lessons: lessons });
  };
  const deleteLesson = (index) => (event) => {
    const lessons = course.lessons;
    lessons.splice(index, 1);
    setLessons({ ...course, lessons: lessons });
  };

  const moveUp = (index) => () => {
    const lessons = course.lessons;
    const moveUp = lessons[index];
    lessons[index] = lessons[index - 1];
    lessons[index - 1] = moveUp;
    setLessons({ ...course, lessons: lessons });
  };
  const clickSubmit = (e) => {
    e.preventDefault();

    const variables = {
      title: title,
      content: content,
      category: category,
      resourceUrl: resourceUrl,
    };
    updateCourse(course._id, variables, history);
  };

  const imageUrl = require("../../img/logo.png").default;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={
            <TextField
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              value={course.name}
              onChange={handleTitle}
            />
          }
          subheader={
            <div>
              {/* <p className="text-black">
                By {course.instructor[0].name} <br />
              </p> */}
              By {course.instructor[0].name}
              {
                <TextField
                  margin="dense"
                  label="Category"
                  type="text"
                  fullWidth
                  value={course.category}
                  onChange={handleChangeCategory}
                />
              }
            </div>
          }
          action={
            user &&
            user._id === course.user && (
              <span className={classes.action}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={clickSubmit}
                >
                  Save
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
            <TextField
              margin="dense"
              multiline
              rows="5"
              label="Description"
              type="text"
              className={classes.textfield}
              value={course.description}
              onChange={handleContent}
            />
            <br />
            <br />
            {/* <input
              accept="image/*"
              onChange={handleChange("image")}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <Button variant="outlined" color="secondary" component="span">
                Change Photo
                <FileUpload />
              </Button>
            </label>{" "} */}
            {/* <span className={classes.filename}>
              {course.image ? course.image.name : ""}
            </span>
            <br /> */}
          </div>
        </div>
        <Divider />
        <div>
          <CardHeader
            title={
              <Typography variant="h6" className={classes.subheading}>
                Lessons - Edit and Rearrange
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
              course.lessons.map((lesson, index) => {
                return (
                  <span key={index}>
                    <ListItem className={classes.list}>
                      <ListItemAvatar>
                        <>
                          <Avatar>{index + 1}</Avatar>
                          {index !== 0 && (
                            <IconButton
                              aria-label="up"
                              color="primary"
                              onClick={moveUp(index)}
                              className={classes.upArrow}
                            >
                              <ArrowUp />
                            </IconButton>
                          )}
                        </>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <TextField
                              margin="dense"
                              label="Title"
                              type="text"
                              fullWidth
                              value={lesson.title}
                              onChange={handleLessonChange("title", index)}
                            />
                            <br />
                            <TextField
                              margin="dense"
                              multiline
                              rows="5"
                              label="Content"
                              type="text"
                              fullWidth
                              value={lesson.content}
                              onChange={handleLessonChange("content", index)}
                            />
                            <br />
                            <TextField
                              margin="dense"
                              label="Resource link"
                              type="text"
                              fullWidth
                              value={lesson.resourceUrl}
                              onChange={handleLessonChange(
                                "resource_url",
                                index
                              )}
                            />
                            <br />
                          </>
                        }
                      />
                      {course.published && (
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="up"
                            color="primary"
                            onClick={deleteLesson(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                    <Divider
                      style={{ backgroundColor: "rgb(106, 106, 106)" }}
                      component="li"
                    />
                  </span>
                );
              })}
          </List>
        </div>
      </Card>
    </div>
  );
}

EditCourse.propTypes = {
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
})(EditCourse);
