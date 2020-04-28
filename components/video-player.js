import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import styled from 'styled-components';

const HLS_EXTENSION = /\.(m3u8)($|\?)/i;
const DASH_EXTENSION = /\.(mpd)($|\?)/i;
const MOV_EXTENSION = /\.(mov)($|\?)/i;

function getVideoType(url) {
  if (HLS_EXTENSION.test(url)) {
    return 'application/x-mpegURL';
  } else if (DASH_EXTENSION.test(url)) {
    return 'application/dash+xml';
  } else if (MOV_EXTENSION.test(url)) {
    return 'video/mp4';
  } else {
    return `video/mp4`;
  }
}

const Outer = styled.div``;

export default function VideoPlayer({
  playlists,
  autoplay = false,
  controls = true,
  fluid = true,
  ...rest
}) {
  if (!playlists) {
    return null;
  }

  const el = useRef();

  const sources =
    playlists
      ?.map(playlist => ({
        type: getVideoType(playlist),
        src: playlist
      }))
      .sort(s => (HLS_EXTENSION.test(s.src) ? -1 : 1)) || [];

  useEffect(() => {
    if (el.current) {
      const player = videojs(el.current, {
        sources,
        autoplay,
        controls,
        fluid
      });

      return () => player.dispose();
    }
  }, [sources]);

  return (
    <Outer>
      <div data-vjs-player {...rest}>
        <video ref={el} className="video-js" />
      </div>
    </Outer>
  );
}
