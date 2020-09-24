import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { responsive } from 'ui';

export const Outer = styled.a`
  display: flex;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 20px;
  background: var(--color-box-background);
  transition: all 0.1s ease-in-out;
  grid-column-end: span 3;
  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const Inner = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 250px;
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
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  left: 0;
  width: 100%;
  padding: 1em;
  color: var(--color-text-main);

  h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
    color: inherit;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
`;

export const Price = styled.span`
  color: var(--color-price);
  font-weight: bold;
  padding-bottom: 5px;
`;
