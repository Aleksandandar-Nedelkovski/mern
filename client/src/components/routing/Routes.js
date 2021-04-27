import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import ProfileForm from "../profile-forms/ProfileForm";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import PrizeStore from "../authenticated/PrizeStore";
import Events from "../authenticated/Events";
import HomeChallenges from "../authenticated/HomeChallenges";
import About from "../common/About";
import ContactUs from "../common/ContactUs";
import ScrollToTop from "../common/ScrollToTop";
import Groups from "../groups/Groups";
import Study from "../study/Study";

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <ScrollToTop />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={ContactUs} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/prize-store" component={PrizeStore} />
        <PrivateRoute exact path="/admin/groups" component={Groups} />
        <PrivateRoute exact path="/admin/study" component={Study} />

        <PrivateRoute
          exact
          path="/home-challenges"
          component={HomeChallenges}
        />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
