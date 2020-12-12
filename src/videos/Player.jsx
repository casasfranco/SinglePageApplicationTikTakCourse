import React, { useEffect, useRef } from "react";
import { PlayerSdk } from "@api.video/player-sdk";

const Player = ({ video }) => {
  let player = useRef(null);

  useEffect(() => {
    if (!player.current) {
      player.current = new PlayerSdk(`#appPlayer-${video.id}`);
      player.current.mute();
      player.current.play();
      player.current.setLoop(true);
    }
  }, [video.id]);
  return (
    <iframe
      title={video.title}
      src={`https://embed.api.video/vod/${video.remoteVideoId}`}
      width="100%"
      height="100%"
      id={`appPlayer-${video.id}`}
      scrolling="no"
      allowFullScreen={true}
      frameBorder="0"
    ></iframe>
  );
};

export default Player;
