import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import videojs from 'video.js';
import 'dashjs';
import 'videojs-contrib-dash';

import playerCss from './player-css';

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
const playSize = 100;

const Outer = styled.div`
  ${playerCss}

  .video-js {
    height: 100% !important;
    position: absolute;
    z-index: 0;

    video {
      transform: none;

      &:not(.vjs-has-started) {
        cursor: pointer;
      }
    }

    button.vjs-big-play-button {
      opacity: 0;
    }
  }
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${playSize}px;
    height: ${playSize}px;
    margin: -${playSize / 2}px 0 0 -${playSize / 2}px;
    border: none;
    background: url('/static/play.svg') no-repeat center center;
    background-size: contain;
    background-color: transparent !important;
  }

  .vjs-has-started + & {
    display: none;
  }
`;

export default function VideoPlayer({
  playlists,
  autoplay = false,
  loop = false,
  controls = true,
  fluid = true,
  ...rest
}) {
  const ref = useRef();
  const playerRef = useRef();

  const sources =
    playlists?.map((playlist) => ({
      type: getVideoType(playlist),
      src: playlist
    })) || [];

  useEffect(() => {
    if (ref.current) {
      const videoElement = document.createElement('video');
      videoElement.setAttribute('playsinline', true);
      videoElement.classList.add('video-js');
      ref.current.insertBefore(videoElement, ref.current.children[0]);

      playerRef.current = videojs(videoElement, {
        sources,
        autoplay,
        loop,
        controls,
        fluid
      });

      // Video.js does not always autoplay for some reason
      if (autoplay) {
        setTimeout(() => playerRef.current?.play(), 0);
      }

      return () => {
        try {
          playerRef.current?.dispose();
        } catch (e) {
          console.log(e);
        }
      };
    }
  }, [sources, autoplay, controls, loop, fluid]);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Outer {...rest} ref={ref}>
      {controls && <Overlay onClick={() => playerRef.current?.play()} />}
    </Outer>
  );
}
