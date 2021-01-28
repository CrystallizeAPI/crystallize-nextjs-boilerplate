import styled from 'styled-components';
import is from 'styled-is';
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

export const Price = styled.span`
  color: var(--color-price);
  position: relative;
  font-weight: bold;
  display: flex;
  font-size: var(--font-listing-price-size);
  padding-bottom: 5px;
  align-items: center;
  ${is('discounted')`
    color:var(--color-discount);
  `}
`;

export const BeforePrice = styled.div`
  font-size: 0.8em;
  opacity: 0.7;
  padding: 0 15px 0 5px;
  font-weight: 500;
  text-decoration: line-through;
  color: var(--color-price);
`;
export const Percentage = styled.div`
  font-size: 12px;
  margin-top: 10px;
  position: absolute;
  right: 0;
  top: 0;
  background: var(--color-discount);
  color: #fff;
  display: inline-block;
  border-radius: 2px;
  z-index: 15;
  padding: 5px 10px;
  font-weight: 600;
`;
