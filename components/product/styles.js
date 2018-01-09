import styled from 'styled-components';

import { colorPrice, mediaXs } from 'components/style-vars';

export const Outer = styled.article`
  margin: 5px;
`;

export const Inner = styled.a`
  text-decoration: none;
`;

export const Figure = styled.figure`
  margin-bottom: 10px;
`;

export const Img = styled.img`
  display: block;
  height: 215px;
  object-fit: fill;

  ${mediaXs} {
    height: 120px;
  }
`;

export const Footer = styled.footer`
  padding: 10px 0;
  margin: 0 50px;
  border-top: 1px solid rgba(222, 222, 222, 0.4);
  display: flex;
  justify-content: space-between;

  ${mediaXs} {
    margin: 0;
  }
`;

export const Price = styled.span`
  color: ${colorPrice};
`;
