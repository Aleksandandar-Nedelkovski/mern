import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { deleteCourse, getCourse } from "../../actions/course";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Enroll from "./../enrollment/Enroll";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  gridList: {
    width: "100%",
    minHeight: 200,
    padding: "16px 0 0px",
  },
  tile: {
    textAlign: "center",
    border: "1px solid #cecece",
    backgroundColor: "#04040c",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    textAlign: "left",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#fffde7",
    display: "block",
  },
  action: {
    margin: "0 10px",
  },
}));

const CourseItem = ({
  auth,
  course: { _id, name, description, category, user, published, lessons },
}) => {
  const classes = useStyles();

  return (
    <GridList cellHeight={220} className={classes.gridList} cols={2}>
      <GridListTile className={classes.tile} style={{ padding: 0 }}>
        <Link to={`/courses/${_id}`}>
          <img
            className={classes.image}
            src={"/api/courses/photo/" + _id}
            alt={name}
          />
        </Link>
        <GridListTileBar
          className={classes.tileBar}
          title={
            <Link to={"/courses/" + _id} className={classes.tileTitle}>
              {description}
            </Link>
          }
          subtitle={<span>{category}</span>}
          actionIcon={
            <div className={classes.action}>{<Enroll courseId={_id} />}</div>
          }
        />
      </GridListTile>
    </GridList>
  );
};

CourseItem.defaultProps = {
  showActions: true,
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseItem);
