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
          <h1 className="x-large">Home Challenges</h1>
          <p className="lead">Week 1</p>
          <YoutubeEmbed embedId="TGhNoDPb5eM" />
        </div>
        <h2 className="lead">Resources</h2>
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
        <h2 className="lead">Recipes</h2>
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
          4 Kids Smoothies Recipes + Smoothie Bowls!
        </a>

        <a
          href="https://www.youtube.com/watch?v=TIAB6-sAn6Q&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=3"
          target="_blank"
          rel="noreferrer"
        >
          Cauliflower Shrimp Fried Rice{" "}
        </a>

        <a
          href="https://www.youtube.com/watch?v=SumKbntg-pU&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=6"
          target="_blank"
          rel="noreferrer"
        >
          Best Banana Oatmeal Muffins | Easy Blender Muffins{" "}
        </a>

        <a
          href="https://www.youtube.com/watch?v=1XyFbSWHsKo&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=7"
          target="_blank"
          rel="noreferrer"
        >
          Healthy Keto Jambalaya with Cauliflower Rice
        </a>

        <a
          href="https://www.youtube.com/watch?v=aLWak28w_WA&list=PLrIqkvSyIic_Y3NvcNTa849PourTnTF5h&index=9"
          target="_blank"
          rel="noreferrer"
        >
          Healthy Blueberry Breakfast Cookie Recipe
        </a>
        <a
          href="https://www.youtube.com/watch?v=gSPPfcedxsc&list=PLt2c0hX1aB8q3ARKPm0tLN2mMnthujdOg"
          target="_blank"
          rel="noreferrer"
        >
          Healthy $1 Dessert Recipes - Easy Budget Meals!
        </a>
        <a
          href="https://www.youtube.com/watch?v=rRT4Tqx-NBk&list=PLt2c0hX1aB8q3ARKPm0tLN2mMnthujdOg&index=9"
          target="_blank"
          rel="noreferrer"
        >
          Bento Box Lunches | Healthy Recipes!
        </a>
        <a
          href="https://www.youtube.com/watch?v=jKBuBCz09CE&list=PLt2c0hX1aB8q3ARKPm0tLN2mMnthujdOg&index=41"
          target="_blank"
          rel="noreferrer"
        >
          Meal Prep: Healthy Dinner Back To School Ideas!
        </a>
        <a
          href="https://www.youtube.com/watch?v=rRT4Tqx-NBk&list=PLt2c0hX1aB8q3ARKPm0tLN2mMnthujdOg&index=9"
          target="_blank"
          rel="noreferrer"
        >
          Zucchini Lasagna!
        </a>
        <a
          href="https://www.youtube.com/watch?v=b-gUTmxaf1U&list=PLt2c0hX1aB8q3ARKPm0tLN2mMnthujdOg&index=42"
          target="_blank"
          rel="noreferrer"
        >
          Healthy Banana Bread In A Jar! - Gluten Free{" "}
        </a>
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
