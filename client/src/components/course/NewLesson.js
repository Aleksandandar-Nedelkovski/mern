import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Add from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import { addLesson } from "../../actions/course";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 500,
  },
}));

function NewLesson({ addLesson, course: { course }, props }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    resource_url: "",
  });
  const { title, content, resource_url } = formData;

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    addLesson(formData, course._id);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-label="Add Lesson"
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        <Add /> &nbsp; New Lesson
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.form}>
          <DialogTitle id="form-dialog-title">Add New Lesson</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              value={title}
              onChange={handleChange("title")}
            />
            <br />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              multiline
              rows="5"
              fullWidth
              value={content}
              onChange={handleChange("content")}
            />
            <br />
            <TextField
              margin="dense"
              label="Resource link"
              type="text"
              fullWidth
              value={resource_url}
              onChange={handleChange("resource_url")}
            />
            <br />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={clickSubmit} color="secondary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

NewLesson.propTypes = {
  addLesson: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  course: state.course,
});

export default connect(mapStateToProps, { addLesson })(NewLesson);
