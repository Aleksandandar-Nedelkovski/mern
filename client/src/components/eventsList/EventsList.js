import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getEvents } from "../../redux/actions/eventActions";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    marginBottom: "3rem",
    "& p": {
      color: "#000",
    },
  },
  mediaContainer: {
    width: "33%",
    marginRight: "3rem",
  },
  cardMedia: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    display: "block",
  },
  [theme.breakpoints.down("sm")]: {
    card: {
      "& h2": {
        fontSize: "1.6rem",
      },
      "& p": {
        fontSize: "0.8rem",
      },
    },
    mediaContainer: {
      width: "33%",
      marginRight: "1rem",
    },
    cardMedia: {
      width: "100%",
      height: 80,
      objectFit: "cover",
      display: "block",
    },
  },
}));

const EventsList = ({ events: { events, loading }, getEvents }) => {
  const classes = useStyles();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  console.log(events);
  return events !== null && !loading ? (
    <Fragment>
      {events.map((event) => (
        <Card
          component={Link}
          to={`/event/${event._id}`}
          key={event._id}
          className={classes.card}
        >
          <div className={classes.mediaContainer}>
            <img
              alt="..."
              className={classes.cardMedia}
              src={require("../../img/event/concert.jpg").default}
            />
          </div>
          <div className={classes.mediaDetails}>
            <Typography variant="h2" color="primary">
              {event.eventName}
            </Typography>
            <Typography variant="body1">
              Created <Moment format="DD/MM/YYYY">{event.date}</Moment> on{" "}
              {event.userName}
            </Typography>
          </div>
        </Card>
      ))}
    </Fragment>
  ) : (
    <Fragment>
      <Typography variant="h2" color="primary" style={{ marginBottom: "3rem" }}>
        No events for the moment ...
      </Typography>
      <Button
        component={Link}
        to="/create-event"
        variant="contained"
        color="primary"
      >
        Get started !!
      </Button>
    </Fragment>
  );
};

const mapState = (state) => ({
  events: state.events,
});

Event.propTypes = {
  events: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
};

export default connect(mapState, { getEvents })(EventsList);
