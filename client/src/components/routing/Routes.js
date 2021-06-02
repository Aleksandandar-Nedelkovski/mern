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
import Events from "../authenticated/EventList";
import HomeChallenges from "../authenticated/HomeChallenges";
import About from "../common/About";
import ContactUs from "../common/ContactUs";
import ScrollToTop from "../common/ScrollToTop";
import Groups from "../groups/Groups";
import Study from "../study/Study";
import AdminDashboard from "../admin/AdminDashboard";
import CreateGroup from "../groups/CreateGroup";
import Courses from "../course/Courses";

// Event
import Event from "../event/Event";
import CreateEvent from "../createEvent/CreateEvent";
import EditEvent from "../editEvent/EditEvent";

// Course
import NewCourse from "../course/NewCourse";
import Course from "../course/Course";
import MyCourses from "../course/MyCourses";
import EditCourse from "../course/EditCourse";
import Enrollment from "../enrollment/Enrollment";

// Video
import UploadVideoPage from "../video/UploadVideo";
import AllVideos from "../video/AllVideos";
import DetailVideoPage from "../video/DetailVideoPage";

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
        <PrivateRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <PrivateRoute exact path="/admin/groups" component={Groups} />
        <PrivateRoute exact path="/admin/study" component={Study} />
        <PrivateRoute exact path="/admin/newgroup" component={CreateGroup} />

        <PrivateRoute
          exact
          path="/home-challenges"
          component={HomeChallenges}
        />

        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/event/:eventId" component={Event} />
        <PrivateRoute exact path="/create-event" component={CreateEvent} />
        <PrivateRoute exact path="/edit-event/:id" component={EditEvent} />

        <PrivateRoute exact path="/courses/:courseId" component={Course} />
        <PrivateRoute
          exact
          path="/teach/courses/:courseId"
          component={Course}
        />
        <PrivateRoute exact path="/teach/courses" component={MyCourses} />
        <PrivateRoute exact path="/teach/course/new" component={NewCourse} />
        <PrivateRoute
          path="/teach/course/edit/:courseId"
          component={EditCourse}
        />
        <PrivateRoute exact path="/learn/:courseId" component={Enrollment} />

        <PrivateRoute exact path="/video/upload" component={UploadVideoPage} />
        <PrivateRoute exact path="/videos" component={AllVideos} />
        <PrivateRoute
          exact
          path="/video/:videoId"
          component={DetailVideoPage}
        />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
