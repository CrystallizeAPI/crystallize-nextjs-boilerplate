import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { colors, responsive } from 'ui';

export const Outer = styled.a`
  display: block;
  height: 100%;
  color: #fff;
  position: relative;
  grid-column-end: span ${p => p.span};
  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const MediaWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 60%;

  .video-js {
    background: ${colors.grey};
    height: 100%;
    width: 100%;
    position: absolute;

    video {
      height: 100%;
      width: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > img {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  top: 0;
  height: 40%;
  color: ${colors.frostbite};
  background: ${colors.grey};
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3em var(--content-padding);

  h3 {
    font-size: 1.6em;
    color: inherit;
    font-family: 'Roboto Slab', 'Roboto', 'sans-serif';
    margin: 0;
  }
`;

export const Description = styled.div`
  font-family: 'Roboto', 'sans-serif';
  font-size: 1rem;
  margin-top: 10px;
  line-height: 1.2rem;
  color: inherit;
`;
