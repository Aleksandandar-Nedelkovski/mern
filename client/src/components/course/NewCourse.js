import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { addCourse } from "../../actions/course";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

const NewCourse = ({ addCourse, auth: { user } }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    image: "",
    category: "",
    redirect: false,
  });
  const { courseName, description, image, category } = formData;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(formData, user._id);
    console.log(formData, user);
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Course
          </Typography>
          <br />
          <input
            accept="image/*"
            onChange={handleChange("image")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Photo
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>{image ? image.name : ""}</span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={courseName}
            onChange={handleChange("courseName")}
            margin="normal"
          />
          <br />
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="category"
            label="Category"
            className={classes.textField}
            value={category}
            onChange={handleChange("category")}
            margin="normal"
          />
          <br />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Submit
          </Button>
          <Link to="/teach/courses" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};

NewCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addCourse })(NewCourse);
