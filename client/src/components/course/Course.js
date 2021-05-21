import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCourse, deleteCourse } from "../../actions/course";
import Spinner from "../layout/Spinner";
import CourseItem from "./CourseItem";
import NewLesson from "./NewLesson";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Add from "@material-ui/icons/AddBox";

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
  deleteCourse,
  auth,
  course: {
    _id,
    name,
    description,
    loading,
    category,
    user,
    published,
    lessons,
  },
  match,
}) => {
  useEffect(() => {
    getCourse(match.params.id);
  }, [getCourse, match.params.id]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({ instructor: {} });

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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
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
    setCourse(course);
  };

  return loading || course === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/courses" className="btn">
        Back To Courses
      </Link>
      <CourseItem course={course} showActions={false} />
      <span className={classes.action}>
        <NewLesson courseId={course._id} addLesson={addLesson} />
      </span>

      {!published ? (
        <>
          {/* <Button color="secondary" variant="outlined" onClick={clickPublish}>
            {lessons.length === 0
              ? "Add atleast 1 lesson to publish"
              : "Publish"}
          </Button> */}
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteCourse(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </>
      ) : (
        <Button color="primary" variant="outlined">
          Published
        </Button>
      )}
    </Fragment>
  );
};

Course.propTypes = {
  getCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourse, deleteCourse })(Course);
