import styled from 'styled-components';
import is from 'styled-is';
import Image from '@crystallize/react-image';

import { colors, responsive } from 'ui';

export const imageSize = {
  lg: '300px',
  xs: '150px'
};

export const Outer = styled.a`
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const Inner = styled.span`
  text-decoration: none;
  display: flex;
  background: #fff;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 10;

  ${is('onlytext')`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  `};
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const Img = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;

  > img {
    width: 150px;
    height: 150px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: stretch;
  text-overflow: ellipsis;

  > div {
    flex: 1;

    &:first-child {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      color: ${colors.darkText};
    }

    &:last-child {
      text-align: center;
    }
  }

  ${responsive.xs} {
    margin: 0;
  }
`;

export const Price = styled.span`
  color: ${colors.price};
  margin-left: 10px;
`;
