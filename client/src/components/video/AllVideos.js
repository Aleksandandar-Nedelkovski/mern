import React, { useEffect } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
// import { getVideos } from "../../actions/video";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
// import Moment from "react-moment";

const { Meta } = Card;
const { Title } = Typography;

// const useStyles = makeStyles((theme) => ({
//   card: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "3rem",
//     "& p": {
//       color: "#aaa",
//     },
//   },
//   mediaContainer: {
//     width: "33%",
//     marginRight: "3rem",
//   },
//   cardMedia: {
//     width: "100%",
//     height: 150,
//     objectFit: "cover",
//     display: "block",
//   },
//   [theme.breakpoints.down("sm")]: {
//     card: {
//       "& h2": {
//         fontSize: "1.6rem",
//       },
//       "& p": {
//         fontSize: "0.8rem",
//       },
//     },
//     mediaContainer: {
//       width: "33%",
//       marginRight: "1rem",
//     },
//     cardMedia: {
//       width: "100%",
//       height: 80,
//       objectFit: "cover",
//       display: "block",
//     },
//   },
// }));

function AllVideos({ video: { videos, loading } }) {
  // useEffect(() => {
  //   getVideos();
  // }, [getVideos]);
  // console.log("All videos", videos);

  // axios.get("/api/video/getVideos").then((response) => {
  //   if (response.data.success) {
  //     console.log(response.data.videos);
  //     setVideos(response.data.videos);
  //   } else {
  //     setAlert("Failed to get Videos");
  //   }
  // });

  const renderCards = videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> All Videos </Title>
      <hr />
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );

  // return videos !== null && !loading ? (
  //   <Fragment>
  //     {videos.map((video) => (
  //       <Card
  //         component={Link}
  //         to={`/video/${video._id}`}
  //         key={video._id}
  //         className={classes.card}
  //       >
  //         <div className={classes.mediaDetails}>
  //           <Typography variant="h4" color="secondary">
  //             {video.videoName}
  //           </Typography>
  //           <Typography variant="body1">
  //             created <Moment format="DD/MM/YYYY">{video.date}</Moment> by{" "}
  //             {video.user}
  //             {renderCards}
  //           </Typography>
  //         </div>
  //       </Card>
  //     ))}
  //   </Fragment>
  // ) : (
  //   <Fragment>
  //     <Typography variant="h2" color="primary" style={{ marginBottom: "3rem" }}>
  //       No videos for now ...
  //     </Typography>
  //   </Fragment>
  // );
}

AllVideos.propTypes = {
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  video: state.video,
});

export default connect(mapStateToProps)(AllVideos);
