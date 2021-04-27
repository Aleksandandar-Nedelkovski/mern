import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserGroups, getCurrentProfile } from "../../actions/profile";

import Group from "./Group";
import ViewGroup from "./ViewGroup";
// import GroupFilter from "./GroupFilter";

const Groups = ({
  profile: { profile },
  group: { user_groups, filtered, changeView },
  getCurrentProfile,
  getUserGroups,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getUserGroups();
  }, [getCurrentProfile, getUserGroups]);

  console.log("Groups", user_groups);
  // const cancelFilter = () => {
  //   clearFilter();
  // };

  const isHost = (group) => {
    if (group.members[0].user === profile.user._id) return true;
    return false;
  };

  const openLargeView = (id) => {
    changeView(id, "large");
  };

  const closeLargeView = (id) => {
    changeView(id, "normal");
  };

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <div>
          <h1 className="large">Groups</h1>
        </div>
        {/* <button onClick={() => cancelFilter()} className="btn-med btn-peer">
          All
        </button> */}

        {profile !== null ? (
          <Fragment>
            <p>Courses</p>
            {profile.courses.map((course, index) => (
              <button key={index} className="btn-med btn-peer">
                {course}
              </button>
            ))}

            <p>Buddies</p>
            {profile.buddies.map((buddy, index) => (
              <button key={index} className="btn-med btn-peer">
                {buddy}
              </button>
            ))}
            <div className="to-right">
              <Link
                to={{
                  pathname: `/newgroup`,
                  state: {
                    goBack: `/groups`,
                  },
                }}
              >
                <button className="btn-med btn-create">Create Group</button>
              </Link>
            </div>

            <div className="group-cards">
              {user_groups.length === 0 ? (
                <Fragment>
                  {filtered.length === 0 ? (
                    <Fragment>
                      {user_groups.map((group, index) => {
                        if (index > 20) return null;
                        if (isHost(group)) return null;
                        if (group.view === "normal") {
                          return (
                            <Group
                              key={group._id}
                              group={group}
                              openLargeView={openLargeView}
                            />
                          );
                        } else {
                          return (
                            <ViewGroup
                              key={group._id}
                              group={group}
                              closeLargeView={closeLargeView}
                            />
                          );
                        }
                      })}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {filtered.map((group, index) => {
                        if (index > 20) return null;
                        if (isHost(group)) return null;
                        if (group.view === "normal") {
                          return (
                            <Group
                              key={group._id}
                              group={group}
                              openLargeView={openLargeView}
                            />
                          );
                        } else {
                          return (
                            <ViewGroup
                              key={group._id}
                              group={group}
                              closeLargeView={closeLargeView}
                            />
                          );
                        }
                      })}
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  No one else created a group yet, maybe you should!ss
                </Fragment>
              )}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>No one has created a group yet, so maybe you should!</p>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Groups.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  // group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, { getCurrentProfile, getUserGroups })(
  Groups
);
