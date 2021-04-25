import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BuddyRequest = ({
  auth: { user },
  profile: { profile },
  accept,
  deny,
}) => {
  const { _id } = profile;
  const { name, avatar } = user;

  return (
    <Fragment>
      <div className="profile-buddy-row">
        <img className="requests-avatar" src={avatar} alt="" />
        <h1 className="requests-text"> {name} </h1>
        <div className="profile-buddy-buttongroup">
          <Link
            to={{
              pathname: `/profile/${_id}`,
              state: {
                goBack: `/dasboard`,
              },
            }}
          >
            <button className="btn-buddy btn-buddy-profile">Profile</button>
          </Link>
          <button
            className="btn-buddy btn-buddy-accept"
            onClick={() => accept(_id)}
          >
            Accept
          </button>
          <button
            className="btn-buddy btn-buddy-decline"
            onClick={() => deny(_id)}
          >
            Decline
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BuddyRequest;
