import styled from 'styled-components';

import { colors, media } from 'components/style';

export const Outer = styled.article`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

export const Inner = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
`;

export const Figure = styled.figure`
  margin-bottom: 10px;
`;

export const Img = styled.img`
  display: block;
  height: 215px;
  object-fit: fill;
  margin: 0 auto;

  ${media.xs} {
    height: 120px;
  }
`;

export const Footer = styled.footer`
  flex: 1 1 auto;
  padding: 10px 0;
  margin: 0 50px;
  border-top: 1px solid rgba(222, 222, 222, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.xs} {
    margin: 0;
  }
`;

export const Price = styled.span`
  color: ${colors.price};
  margin-left: 10px;
`;
