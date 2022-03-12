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
  display: grid;
  align-items: center;
  grid-template-columns: 90px 1fr;
  grid-gap: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: 120px;
  overflow: hidden;
  border: 1px solid #dfdfdf;
  background: var(--listformat-product-background);
  figure {
    height: 100%;
  }
`;

export const Footer = styled.div`
  padding: 5px 0;
  color: var(--color-text-main);

  h3 {
    display: block;
    padding: 0 0 10px;
    font-size: 20px;
    font-family: var(--font-family-main);
    color: inherit;
    margin: 0;
  }
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > img {
    display: block;
    object-fit: var(--microformat-image-fit);
    object-position: var(--microformat-image-position);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
