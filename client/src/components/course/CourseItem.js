import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse } from "../../actions/course";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "90%",
    margin: "auto",
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: "#ffffff",
  },
  extraTop: {
    marginTop: theme.spacing(12),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 200,
    padding: "16px 0 10px",
  },
  tile: {
    textAlign: "center",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
  },
  enrolledTitle: {
    color: "#efefef",
    marginBottom: 5,
  },
  action: {
    margin: "0 10px",
  },
  enrolledCard: {
    backgroundColor: "#616161",
  },
  divider: {
    marginBottom: 16,
    backgroundColor: "rgb(157, 157, 157)",
  },
  noTitle: {
    color: "lightgrey",
    marginBottom: 12,
    marginLeft: 8,
  },
}));

const CourseItem = ({ course: { _id, name, category } }) => {
  const classes = useStyles();

  return (
    <GridList cellHeight={220} className={classes.gridList} cols={2}>
      <GridListTile className={classes.tile} style={{ padding: 0 }}>
        <Link to={"/courses/" + _id}>
          <img
            className={classes.image}
            src={require("../../img/logo.png").default}
            alt={name}
          />
        </Link>
        <GridListTileBar
          className={classes.tileBar}
          title={
            <Link to={"/courses/" + _id} className={classes.tileTitle}>
              {name}
            </Link>
          }
          subtitle={<span>{category}</span>}
        />
      </GridListTile>
    </GridList>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default connect(null, { deleteCourse })(CourseItem);
