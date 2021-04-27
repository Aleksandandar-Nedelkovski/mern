import React from "react";
import { setAlert } from "../../actions/alert";
import api from "../../utils/api";
import StudyMember from "./StudyMember";

const StudyMembers = ({ groupid, members, reload, isHost }) => {
  const kickMember = async (userid) => {
    try {
      await api.delete(`../api/groups/members/${groupid}/${userid}`);

      setAlert("Member successfully removed", "success");
    } catch (err) {
      setAlert("Failed to remove", "danger");
    }
  };

  const kick = async (userid) => {
    await kickMember(userid);
    reload();
  };
  return (
    <div className="study-card">
      <h1 className="study-text study-header"> Members </h1>
      {members.map((member) => (
        <StudyMember
          key={member._id}
          userid={member.user}
          kick={kick}
          isHost={isHost}
        />
      ))}
    </div>
  );
};

export default StudyMembers;
