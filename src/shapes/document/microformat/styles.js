import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

export const Outer = styled.a`
  height: 100%;
  width: 100%;
  position: relative;
  border: 4px solid #fff;
`;

export const Inner = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-gap: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  z-index: 4;
  width: 100%;

  .tag {
    font-size: 12px !important;
    margin-right: 8px;
  }
`;
export const MediaWrapper = styled.div`
  flex: 0 0 auto;
  border: 1px solid #dfdfdf;
  height: 120px;

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
  padding: 5px 0;
  color: var(--color-text-main);

  h3 {
    display: block;
    padding: 5px 0 0px;
    font-size: 20px;
    font-family: var(--font-family-main);
    color: inherit;
    margin: 0;
    line-height: 1.4em;
  }
`;
