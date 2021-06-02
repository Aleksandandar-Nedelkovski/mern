import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourses } from "../../actions/course";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  avatar: {
    borderRadius: 0,
    width: 65,
    height: 40,
  },
  listText: {
    marginLeft: 16,
  },
}));

function MyCourses({ getCourses, course: { courses } }) {
  const classes = useStyles();
  const [redirectToSignin] = useState(false);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Your Courses
            <span className={classes.addButton}>
              <Link to="/teach/course/new">
                <Button color="primary" variant="contained">
                  <Icon className="fa fa-plus-circle" /> New Course
                </Button>
              </Link>
            </span>
          </Typography>
          <List dense>
            {courses.map((course, i) => {
              return (
                <Link to={"/courses/" + course._id} key={i}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          "/api/courses/photo/" +
                          course._id +
                          "?" +
                          new Date().getTime()
                        }
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={course.name}
                      className={classes.listText}
                    />
                  </ListItem>
                  <Divider />
                </Link>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>
  );
}

MyCourses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourses,
})(MyCourses);
