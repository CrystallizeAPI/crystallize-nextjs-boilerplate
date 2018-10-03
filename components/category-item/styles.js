import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { colors, responsive } from 'ui';

export const imageWidth = {
  lg: '300px',
  xs: '150px'
};

export const Outer = styled.a`
  margin: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  &:before {
    content: '';
    width: 80%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const Inner = styled.span`
  text-decoration: none;
  display: flex;
  background: #fff;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 10;
`;

export const Figure = styled.figure`
  margin-bottom: 10px;
  display: flex;
  min-height: 400px;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Img = styled(Image)`
  display: block;
  width: 100%;
  object-fit: contain;
  margin: 0 auto;

  ${responsive.xs} {
    height: ${imageWidth.xs};
  }
`;

export const Footer = styled.footer`
  flex: 1 1 auto;
  padding: 15px 0;
  margin: 0 20px;
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  > div {
    flex: 1;

    &:first-child {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      color: ${colors.darktext};
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
