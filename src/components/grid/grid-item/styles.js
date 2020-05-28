import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { H3, responsive } from 'ui';

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;

  > img {
    display: block;
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled(H3)`
  font-size: 2.5rem;
  text-transform: uppercase;
  color: var(--color-text-main);
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

export const Price = styled.span`
  color: inherit;
  font-size: 1.5rem;
  color: var(--color-price);
  font-weight: bold;
`;

export const Outer = styled.a`
  position: relative;
  background: var(--color-box-background);
  height: 100%;
  display: flex;
  padding: 0 50px;

  &:hover {
    text-decoration: none;
  }

  button {
    margin: 0 auto;
    min-width: 200px;
    max-width: 80%;
  }

  ${responsive.xs} {
    flex-direction: column-reverse;
    text-align: center;
    margin-bottom: 15px;
    padding: 50px;
  }

  ${responsive.mdPlus} {
    /* Each grid type size generates a class "cell-COLUMNxROW" */
    &.cell-1x1 {
      flex-direction: column-reverse;
      justify-content: center;
      padding-bottom: 50px;
      text-align: center;
    }
    &.cell-1x2 {
      flex-direction: row-reverse;
      padding: 0 50px 0 0;
      ${Img} {
        width: 200%;
        transform: translateX(-50%);
      }
      button {
        margin: 0 0;
      }
    }
    &.cell-1x3 {
      padding-left: 15rem;
      button {
        margin: 0 0;
      }
    }
    &.cell-2x2 {
      flex-direction: column-reverse;
      padding-bottom: 50px;
      text-align: center;
    }
  }
`;
