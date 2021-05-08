import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import { getEvent } from "../../actions/eventActions";
import { connect } from "react-redux";
import { updateEvent } from "../../actions/eventActions";

import { createEventStyles } from "../createEvent/CreateEventStyles";

const EditEvent = ({
  updateEvent,
  getEvent,
  history,
  events: { loading, event },
  match,
}) => {
  // HOOKS
  const classes = createEventStyles();
  const [formData, setFormData] = useState({
    eventName: "",
    type: "",
    lat: null,
    lng: null,
    date: new Date(),
    time: new Date(),
    description: "",
  });
  const { eventName, type, date, time, description } = formData;

  useEffect(() => {
    getEvent(match.params.id);
    setFormData({
      eventName: loading ? "" : event.eventName,
      type: loading ? "" : event.type,
      lat: loading ? "" : event.lat,
      lng: loading ? "" : event.lng,
      date: loading ? new Date() : event.date,
      time: loading ? new Date() : event.time,
      description: loading ? "" : event.description,
    });
    // eslint-disable-next-line
  }, [getEvent, loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (date) => {
    setFormData({ ...formData, date });
  };
  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  // const handleAddressChange = (address) => {
  //   setFormData({ ...formData, address });
  // };

  // const handleSelect = async (address) => {
  //   const res = await geocodeByAddress(address);
  //   const latLng = await getLatLng(res[0]);
  //   console.log(res[0]);
  //   console.log(latLng);
  //   setFormData({
  //     ...formData,
  //     address,
  //     lat: latLng.lat,
  //     lng: latLng.lng,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(event._id, formData, history);
  };

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant="h2" color="primary">
          Edit your event
        </Typography>
        <TextField
          className={classes.textFields}
          name="eventName"
          value={eventName}
          onChange={handleChange}
          placeholder="Event Name"
          fullWidth
        />

        <FormControl className={classes.textFields} fullWidth>
          <InputLabel id="type-event">Type</InputLabel>
          <Select
            labelId="type-event"
            name="type"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={"visite"}>Visite</MenuItem>
            <MenuItem value={"concert"}>Concert</MenuItem>
            <MenuItem value={"festival"}>Festival</MenuItem>
            <MenuItem value={"restaurant"}>Restaurant</MenuItem>
            <MenuItem value={"cinema"}>Cinéma</MenuItem>
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <DatePicker
            className={classes.datePicker}
            name="date"
            format="dd/MM/yyyy"
            value={date}
            onChange={handleDayChange}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <TimePicker
            className={classes.timePicker}
            name="time"
            format="am/pm"
            value={time}
            onChange={handleTimeChange}
          />
        </MuiPickersUtilsProvider>

        <TextField
          className={classes.textFields}
          name="description"
          multiline
          rows={3}
          value={description}
          onChange={handleChange}
          placeholder="Description"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      </form>
    </Paper>
  );
};

const mapState = (state) => ({
  events: state.events,
});

EditEvent.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

export default connect(mapState, { updateEvent, getEvent })(EditEvent);
