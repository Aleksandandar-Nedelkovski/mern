import React, { Fragment } from "react";
import YoutubeEmbed from "../common/YoutubeEmbed";

export default function ProgressData() {
  return (
    <Fragment>
      <h1 className="large">Tokens earned: 100</h1>
      <h1 className="text-center large">
        Photos and videos from the challenges
      </h1>
      <YoutubeEmbed embedId="rokGy0huYEA" />
      <p>child’s Fitbit data</p>
    </Fragment>
  );
}
