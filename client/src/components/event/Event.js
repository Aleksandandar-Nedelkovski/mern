import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { eventStyles } from "./EventStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Moment from "react-moment";
// import GoogleMapReact from "google-map-react";
// import Marker from "../../components/marker/Marker";
import AttendeeItem from "../../components/attendeeItem/AttendeeItem";
import {
  getEvent,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
} from "../../actions/eventActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EventComments from "../../components/eventComments/EventComments";

const Event = ({
  auth,
  events: { event, loading },
  match,
  getEvent,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
  history,
}) => {
  const classes = eventStyles();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getEvent(match.params.eventId);
  }, [getEvent, match.params.eventId]);

  const displayImage = () => {
    if (!loading && event !== null) {
      switch (event.type) {
        case "visite":
          return require(`../../img/event/visite.jpg`);
        case "concert":
          return require(`../../img/event/concert.jpg`);
        case "restaurant":
          return require(`../../img/event/restaurant.jpg`);
        case "festival":
          return require(`../../img/event/festival.jpg`);
        case "cinema":
          return require(`../../img/event/cinema.jpg`);
        default:
          return require(`../../img/event/default.jpg`);
      }
    }
  };

  const displayButtons = () => {
    if (!auth.loading && auth.user !== null && auth.user._id === event.user) {
      return (
        <div className={classes.eventActions}>
          <Button
            component={Link}
            to={`/edit-event/${event._id}`}
            disableRipple
            variant="contained"
            color="primary"
          >
            <i className="fas fa-pen"></i> Edit
          </Button>
          <Button
            disableRipple
            onClick={() => setModal(true)}
            variant="contained"
            color="secondary"
          >
            <i className="fas fa-eraser"></i> Remove
          </Button>
        </div>
      );
    } else if (!auth.loading && auth.user !== null) {
      return (
        <div className={classes.eventActions}>
          <Button
            onClick={() => subscribeEvent(event._id)}
            disableRipple
            variant="contained"
            color="primary"
          >
            <i className="fas fa-pen"></i> Confirm
          </Button>
          <Button
            onClick={() => unsubscribeEvent(event._id)}
            disableRipple
            variant="contained"
            color="secondary"
          >
            <i className="fas fa-eraser"></i> Withdraw
          </Button>
        </div>
      );
    }
    return;
  };

  return event !== null && !loading ? (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper className={classes.container}>
          <img src={displayImage()} className={classes.media} alt="" />
          <div className={classes.eventContent}>
            <Typography variant="h2" color="primary">
              {event.eventName}
            </Typography>
            <div className={classes.eventDetails}>
              <Typography variant="body1">
                Date:{" "}
                <span>
                  {event.date}
                  {/* <Moment format="DD/MM/YYYY">{event.date}</Moment> */}
                </span>
                Time:{" "}
                <span>
                  {event.time}
                  {/* <Moment format="hh:mm">{event.time}</Moment> */}
                </span>
              </Typography>
            </div>

            {displayButtons()}

            {modal && (
              <Dialog
                open={modal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete your event?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Be careful, you can't go back!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setModal(false)}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteEvent(event._id, history)}
                    variant="contained"
                    color="primary"
                  >
                    I am sure
                  </Button>
                </DialogActions>
              </Dialog>
            )}

            <div className={classes.description}>
              <Typography variant="h3" color="primary">
                Description:
              </Typography>
              <Typography variant="body1">{event.description}</Typography>
            </div>

            <EventComments event={event} />
          </div>
        </Paper>
      </Grid>

      {/* Attendees */}
      <Grid item xs={12} lg={4}>
        <Paper className={classes.container}>
          <Typography variant="h4" color="primary">
            List of participants:
          </Typography>
          {!loading &&
            event.attendees.map(({ _id, avatar, name, host }) => (
              <AttendeeItem key={_id} avatar={avatar} name={name} host={host} />
            ))}
        </Paper>
      </Grid>
      {/* End Attendees */}
    </Grid>
  ) : (
    <CircularProgress />
  );
};

const mapState = (state) => ({
  events: state.events,
  auth: state.auth,
});

Event.propTypes = {
  events: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  subscribeEvent: PropTypes.func.isRequired,
  unsubscribeEvent: PropTypes.func.isRequired,
};

export default connect(mapState, {
  getEvent,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
})(Event);
