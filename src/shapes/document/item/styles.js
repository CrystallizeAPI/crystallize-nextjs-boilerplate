import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

import { responsive, H3 } from 'ui';

export const Outer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  border: 4px solid #fff;
  background: var(--listformat-document-background);
  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const MediaWrapper = styled.div`
  flex: 0 0 auto;
  border: 1px solid #dfdfdf;
  width: 100%;
  height: 100%;
  figure {
    height: 100%;
  }
  .react-video {
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
  }
  img,
  .react-video video {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Text = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 50%;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3em var(--content-padding);
  position: absolute;
  z-index: 2;
  color: #fff;
  bottom: 0;

  padding-right: 20%;
  background: linear-gradient(
    180deg,
    rgba(8, 7, 8, 0) 0%,
    rgba(8, 7, 8, 0.8) 100%
  );
  h3 {
    font-size: var(--font-size-l);
    color: inherit;
    margin: 0;
    line-height: 1.4em;
  }
`;

const textShadowStyles = `
  text-shadow: 2px 2px 6px black;
`;
export const Title = styled(H3)`
  ${textShadowStyles}
`;

export const Description = styled.div`
  margin-top: 10px;
  color: #fff;
  ${textShadowStyles}

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #fff;
    line-height: 1.8em;
    font-size: var(--font-size-secondary);
  }
`;
