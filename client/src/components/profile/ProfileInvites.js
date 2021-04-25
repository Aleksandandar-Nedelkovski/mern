import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
// import ProfileInvite from "./ProfileInvite";
// import { setAlert } from "../../actions/alert";

// import { loadGroups } from "../../actions/group";
// import ProfileView from "../profile/ProfileView";
import api from "../../utils/api";

const ProfileInvites = ({
  getCurrentProfile,

  group,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getGroups();
  }, [getCurrentProfile]);
  const [groups, setGroups] = useState({
    groups: null,
    loading: true,
    success: true,
  });

  console.log(groups);

  const getGroups = async () => {
    try {
      const res = await api.get("profile/invites");
      console.log("res ProfileInvites", res);

      setGroups({
        groups: res.data,
        loading: false,
        success: true,
      });
    } catch (err) {
      setGroups({
        groups: null,
        loading: false,
        success: false,
      });
    }
  };

  // const joinRequest = async (groupid) => {
  //   try {
  //     const res = await api.put(`profile/invites/${groupid}`);

  //     setAlert(res.data.msg, "success");
  //   } catch (err) {
  //     setAlert(err.response.data.msg, "danger");
  //   }
  // };

  // const denyRequest = async (groupid) => {
  //   try {
  //     const res = await api.delete(`profile/invites/${groupid}`);

  //     setAlert(res.data.msg, "success");
  //   } catch (err) {
  //     setAlert(err.response.data.msg, "danger");
  //   }
  // };

  // const join = async (groupid) => {
  //   await joinRequest(groupid);
  //   loadProfile();
  // };

  // const deny = async (groupid) => {
  //   await denyRequest(groupid);
  //   loadProfile();
  // };
  return <div>hi</div>;

  // return (
  //   !loading && (
  //     <Fragment>
  //       {success ? (
  //         <div className="group-cards">
  //           {groups.map((group) => (
  //             <ProfileInvite
  //               key={group._id}
  //               group={group}
  //               join={join}
  //               deny={deny}
  //             />
  //           ))}
  //         </div>
  //       ) : (
  //         <Fragment>
  //           <h2> Failure loading invites </h2>
  //         </Fragment>
  //       )}
  //     </Fragment>
  //   )
  // );
};

ProfileInvites.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  group: state.group,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileInvites);
