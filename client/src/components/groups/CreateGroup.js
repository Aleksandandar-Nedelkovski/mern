import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadGroup } from "../../actions/group";

const CreateGroup = ({
  uploadGroup,
  existingGroup,
  history,
  location,
  finish,
  group: { groups },
  profile: { profile, profile_exists },
}) => {
  const {
    creation_error,
    creation_success,
    clearErrors,
    clearSuccess,
  } = groups;

  const [courses, setCourses] = useState([]);

  const [group, setGroup] = useState({
    ...existingGroup,
    id: existingGroup._id,
  });

  const { name, course, description, max_members } = group;

  useEffect(() => {
    uploadGroup();
    if (group._id) {
      delete group._id;
    }
  }, [uploadGroup]);

  useEffect(() => {
    if (profile_exists && profile.courses.length > 0) {
      setCourses(profile.courses);
      if (!existingGroup.exists) {
        setGroup({
          ...group,
          course: profile.courses[0],
        });
      }
    }
  }, [profile]);

  useEffect(() => {
    if (creation_error !== null) {
      creation_error.forEach((error) => setAlert(error, "danger"));
      clearErrors();
    }

    if (creation_success === true) {
      if (existingGroup.exists) {
        setAlert("Group successfully edited", "success");
        clearSuccess();
        finish();
      } else {
        setAlert("Group successfully created", "success");
        clearSuccess();
        history.push("/studyview");
      }
    }
  }, [creation_error, creation_success]);

  const onChange = (e) =>
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });

  const changeCourse = (course) => {
    setGroup({
      ...group,
      course,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (group.max_members === "0" || group.max_members === "1") {
      setAlert("Member limit too small", "danger");
    } else {
      uploadGroup(group);
    }
  };

  return (
    <Fragment>
      <div className="create-group-wrap">
        <div className="container text-center">
          <div className="create-group-form card-lg">
            {group.exists ? (
              <h1 className="text-center form-title">Edit Group</h1>
            ) : (
              <h1 className="text-center form-title">Create Group</h1>
            )}
            <form onSubmit={onSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="input"
                value={name}
                onChange={onChange}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                className="input"
                value={description}
                onChange={onChange}
              />
              <label htmlFor="max_members">Member Limit</label>
              <input
                type="text"
                pattern="[0-9]*"
                name="max_members"
                id="max_members"
                placeholder="20"
                className="input"
                value={max_members}
                onChange={onChange}
              />
              <h2 className="small mb-1">Must be at least 2</h2>
              <h2 className="course-title mb-05">
                {" "}
                Course: <span className="purple">{course}</span>{" "}
              </h2>
              <div className="create-group-button-group">
                {courses.map((c, index) => {
                  if (course !== c)
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => changeCourse(c)}
                        className="btn-small course-btn"
                      >
                        {c}
                      </button>
                    );
                  else return <Fragment key={index}></Fragment>;
                })}
              </div>
              {profile.courses.length > 0 ? (
                <Fragment>
                  <a href="#" className="register-btn">
                    <input
                      type="submit"
                      value="Create"
                      className="btn-primary create-group-btn"
                    />
                  </a>
                </Fragment>
              ) : (
                <Fragment>
                  <input
                    type="submit"
                    value="Cannot submit"
                    className="btn-primary create-group-btn"
                    disabled={true}
                  />
                  <h2 className="small mb-1">
                    {" "}
                    You need to be in a course to create a group{" "}
                  </h2>
                </Fragment>
              )}
            </form>
          </div>
        </div>
        {!existingGroup.exists && (
          <Fragment>
            <Link
              to={
                location.state.goBack !== null
                  ? `${location.state.goBack}`
                  : `/home`
              }
            >
              <button className="btn-med btn-peer">Back</button>
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

CreateGroup.defaultProps = {
  existingGroup: {
    exists: false,
    name: "",
    course: "",
    description: "",
    public: false,
    max_members: 20,
  },
};

CreateGroup.propTypes = {
  uploadGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  profile: state.profile,
});

export default connect(mapStateToProps, { uploadGroup })(CreateGroup);
