import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { colors, responsive } from 'ui';

export const imageSize = {
  lg: '300px',
  xs: '150px'
};

export const ProductOuter = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  &:after {
    content: '';
    background: ${colors.frostbite};
    width: 80%;
    height: 5%;
    position: absolute;
    left: 10%;
    bottom: -1px;
    filter: blur(9px);
    opacity: 0.15;
    transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
  }
  &:hover:after {
    filter: blur(4px);
    opacity: 0.35;
  }
`;

export const ProductInner = styled.span`
  text-decoration: none;
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-weight: 600;
  color: ${colors.darkText};
  text-align: center;
  align-items: stretch;
  justify-content: stretch;
  background: #fff;
  border-radius: 12px;
  &:hover {
    background: #fefefe;
  }
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
  position: relative;
  > img {
    position: relative;
    object-fit: contain;
    width: 150px;
    height: 150px;
  }
`;
export const Outer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  grid-column: span 2;
`;

export const Inner = styled.span`
  text-decoration: none;
  width: 100%;
  position: relative;
  z-index: 10;
  padding: 40px;
  display: flex;
  flex-direction: row;
  height: 100%;
  font-weight: 600;
  color: ${colors.darkText};
  border: 2px solid #dfdfdf;
  border-radius: 12px;
  overflow: hidden;
  &:hover {
    border: 2px solid #fff;
    background: #fff;
  }
`;

export const ArticleImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40%;
`;

export const ArticleImg = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 350px;
  max-width: 100%;
  position: relative;

  > img {
    position: relative;
    width: 100%;
    object-fit: contain;
    height: 100%;
    max-height: 100%;
  }
`;

export const MicroFormat = styled.div`
  text-align: left;
  width: 60%;
  padding: 1em;
  h3 {
    font-size: 2em;
    color: ${colors.frostbite};
    font-family: 'Roboto Slab', 'Roboto', 'sans-serif';
  }
`;
export const ContentLine = styled.div`
  display: flex;
  padding: 15px;
  margin:8px;  
  flex-direction ${p => (p.right ? 'row-reverse' : 'row')};
  justify-content: space-between;
  align-items: stretch;
  text-overflow: ellipsis;

  > div {
    flex: 1;
  }

  ${responsive.xs} {
    margin: 0;
  }
`;

export const Price = styled.span`
  color: ${colors.price};
`;
