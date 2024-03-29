import React, { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import { setAlert } from "../../actions/alert";
import BuddyRequest from "./BuddyRequest";

const BuddyRequests = ({ setRefreshBuddies }) => {
  const [reqProfiles, setReqProfiles] = useState({
    profiles: null,
    empty: null,
  });
  console.log("reqProfiles", reqProfiles);
  const getRequests = async () => {
    try {
      const res = await api.get(`/profile/buddyRequests`);

      let empty = true;
      // if (res.data.length > 0) {
      //   empty = false;
      // }

      setReqProfiles({
        profiles: res.data,
        empty,
      });
    } catch (err) {
      return (
        <div className="card-md buddy-card">
          <h2> Problem Loading Buddy Requests </h2>
        </div>
      );
    }
  };

  const accept = async (profileid) => {
    try {
      // const res = await api.put(`/profile/buddy/${profileid}`);

      setAlert("Buddy added", "success");

      // let empty = true;
      // if (res.data.length > 0) {
      //   empty = false;
      // }

      setRefreshBuddies(true);

      getRequests();
    } catch (err) {
      if (err.response.data !== undefined) {
        setAlert(err.response.data.msg, "danger");
      }
    }
  };

  const deny = async (profileid) => {
    try {
      await api.delete(`api/profile/request/${profileid}`);

      setAlert("Request declined", "success");
      getRequests();
    } catch (err) {
      setAlert(err.response.data.msg, "danger");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Fragment>
      <div className="card-md buddy-card">
        {reqProfiles.empty === null ? (
          <h3>Loading</h3>
        ) : (
          <Fragment>
            {reqProfiles.empty ? (
              <Fragment>
                <h2> You have no requests </h2>
              </Fragment>
            ) : (
              <Fragment>
                <h1 className="requests-title">Requests</h1>
                {reqProfiles.profiles.map((profile) => (
                  <BuddyRequest
                    key={profile._id}
                    profile={profile}
                    accept={accept}
                    deny={deny}
                  />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
        {reqProfiles.empty === null ? (
          <h3>Loading Buddy Requests</h3>
        ) : (
          <Fragment>
            <p>Buddy Requests</p>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default BuddyRequests;
