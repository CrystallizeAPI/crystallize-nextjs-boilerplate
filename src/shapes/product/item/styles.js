import styled from 'styled-components';
import { Image } from '@crystallize/react-image';

export const Outer = styled.a`
  height: 100%;
  color: var(--color-main-background);
  border: 4px solid #fff;
  display: block;
  transition: all 0.1s ease-in-out;
`;

export const Inner = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #dfdfdf;
  background: var(--listformat-product-background);
  figure {
    height: 100%;
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    display: block;
    object-fit: var(--listformat-product-image-fit);
    object-position: var(--listformat-product-image-position);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding: 5px 0;
  color: var(--color-text-main);

  h3 {
    display: block;
    padding: 0 0 5px;
    font-size: var(--font-listing-name-size);
    font-family: var(--font-family-main);
    color: inherit;
    margin: 0;
  }
`;

export const Tags = styled.div`
  position: absolute;
  display: flex;
  z-index: 4;
  bottom: 15px;
  padding: 5px;
  width: 100%;
`;
