import React, { Fragment } from "react";
import MyMonthlyCalendar from "./MonthlyCalendar";

export default function HomeChallenges() {
  return (
    <Fragment>
      <h1 className="large">Home Challenges</h1>
      <MyMonthlyCalendar />
    </Fragment>
  );
}
