import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideo } from "../store/videos";
import Player from "./Player";

const VideoShow = (props) => {
  let { id } = useParams();
  let video = useSelector((state) => state.videos.currentVideo);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideo(id));
  }, []);

  return (
    <div>
      {video && (
        <>
          <h2>{video.title}</h2>
          <Player video={video}></Player>
        </>
      )}
    </div>
  );
};

export default VideoShow;
