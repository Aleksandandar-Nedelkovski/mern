import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import YoutubeEmbed from "../common/YoutubeEmbed";
// import Pagination from "./Pagination";
// import { Link } from "react-router-dom";

const HomeChallenges = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        {/* <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2"> */}
        <div className="bg-white rounded px-6 py-8 shadow-md">
          <h1 className="x-large text-center">
            <i className="fas fa-wrench" /> Home Challenges
          </h1>
          <p>Week 1</p>
          <YoutubeEmbed embedId="TGhNoDPb5eM" />
        </div>
        <h2>Resources</h2>
        <a
          href="https://www.youtube.com/channel/UC0oO2ekgH83Zc3j7SOvT_2Q"
          target="_blank"
          rel="noreferrer"
        >
          MOMables{" "}
        </a>
        <a
          href="https://www.youtube.com/channel/UCZxTHv4_G9RUqefQtIXorig/featured"
          target="_blank"
          rel="noreferrer"
        >
          MindOverMunch{" "}
        </a>

        <h2>Recipes</h2>
        <a
          href="https://www.youtube.com/watch?v=LexTnUKqTqU&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=3"
          target="_blank"
          rel="noreferrer"
        >
          Allergy Friendly Pancakes: Gluten-Free, Dairy-Free, Egg-Free{" "}
        </a>
        <a
          href="https://www.youtube.com/watch?v=AE9-0ls53vE"
          target="_blank"
          rel="noreferrer"
        >
          Smoothie Recipes{" "}
        </a>

        <a
          href="https://www.youtube.com/watch?v=TIAB6-sAn6Q&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=3"
          target="_blank"
          rel="noreferrer"
        >
          Cauliflower Shrimp Fried Rice{" "}
        </a>

        <br />
        <br />
        <br />
        {/* <Pagination /> */}
        {/* </div> */}
      </div>
    </Fragment>
  );
};

HomeChallenges.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(HomeChallenges);
