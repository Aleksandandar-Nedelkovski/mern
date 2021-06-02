import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";
import Moment from "react-moment";
import { commentStyles } from "./EventCommentsStyles";
import { connect } from "react-redux";
import { deleteComment, addComment } from "../../actions/eventActions";

const EventComments = ({ event, auth, deleteComment, addComment }) => {
  const classes = commentStyles();
  const [toggleForm, setToggleForm] = useState(false);
  const [text, setText] = useState("");
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(event._id, { text });
    setText("");
    setToggleForm(false);
  };

  return (
    <div className={classes.comments}>
      <Typography variant="h3" color="primary">
        Comment:
      </Typography>

      <Button
        className={classes.commentButton}
        onClick={() => setToggleForm(true)}
        variant="contained"
        color="primary"
      >
        Add a comment
      </Button>

      {toggleForm && (
        <form
          noValidate
          className={classes.commentForm}
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.formInput}
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your comment"
            fullWidth
          />
          <Button
            className={classes.formButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </form>
      )}

      {event.comments === null || event.comments.length === 0 ? (
        <Typography style={{ marginTop: "2rem" }} variant="body1">
          No comments yet
        </Typography>
      ) : (
        event.comments.map(({ _id, name, avatar, text, date, user }) => (
          <div key={_id} className={classes.comment}>
            <div className={classes.commentUser}>
              <Avatar
                className={classes.commentUserAvatar}
                alt=""
                src={`http:${avatar}`}
              />
              <Typography variant="h5">{name}</Typography>
            </div>
            <div>
              <Typography variant="body1">{text}</Typography>
              <Typography variant="caption" className={classes.commentDate}>
                Posted on{" "}
                <span>{<Moment format="DD/MM/YYYY">{date}</Moment>}</span>
              </Typography>
            </div>
            {!auth.loading && auth.isAuth && auth.user._id === user && (
              <HighlightOffIcon
                className={classes.commentIcon}
                onClick={() => setModal(true)}
              />
            )}
            {modal && (
              <Dialog
                open={modal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete your comment?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => setModal(false)}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      deleteComment(event._id, _id);
                      setModal(false);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const mapState = (state) => ({
  auth: state.auth,
});

EventComments.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(mapState, { addComment, deleteComment })(EventComments);
