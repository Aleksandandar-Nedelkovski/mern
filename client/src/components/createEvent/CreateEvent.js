import React, { useState } from "react";
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
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import { createEventStyles } from "./CreateEventStyles";
import { Link } from "react-router-dom";

const CreateEvent = ({ createEvent, history }) => {
  // HOOKS
  const classes = createEventStyles();
  const [formData, setFormData] = useState({
    eventName: "",
    type: "",
    lat: null,
    lng: null,
    date: new Date(),
    time: new Date(),
  });
  const { eventName, type, date, time, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSelect = async () => {
    setFormData({
      ...formData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant="h2" color="primary">
          Create an event
        </Typography>
        <TextField
          className={classes.textFields}
          type="text"
          name="eventName"
          value={eventName}
          onChange={handleChange}
          placeholder="Title"
          fullWidth
        />

        <FormControl className={classes.textFields} fullWidth>
          <InputLabel id="typaramspe-event">Type</InputLabel>
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
            <MenuItem value={"cinema"}>Cinema</MenuItem>
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
          rows={5}
          value={description}
          onChange={handleChange}
          placeholder="Description"
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
        <Link to="/teach/courses" className={classes.submit}>
          <Button variant="contained">Cancel</Button>
        </Link>
      </form>
    </Paper>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, { createEvent })(CreateEvent);
