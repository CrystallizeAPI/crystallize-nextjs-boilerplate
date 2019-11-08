import styled, { keyframes, css } from 'styled-components';
import CrystallizeImage from '@crystallize/react-image';

import { animationSpeedMs } from '../../helpers';

const animationItemHighlight = keyframes`
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(0.97);
    }
    75% {
      transform: scale(0.93);
    }
    100% {
      transform: scale(1);
    }
  `;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px;
  border-bottom: 1px solid #eee;
  position: relative;

  ${p =>
    p.animate &&
    css`
      animation: ${animationItemHighlight} ${animationSpeedMs}ms 1;
    `};
`;

export const ItemInfo = styled.span`
  display: flex;
  align-items: center;
`;

export const ItemInfoText = styled.div``;

export const ItemImage = styled(CrystallizeImage).attrs(() => ({
  sizes: '50px'
}))`
  width: 50px;
  margin-right: 10px;
`;

export const ItemName = styled.div``;

export const ItemQuantityChanger = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemQuantity = styled.span`
  display: inline-block;
  margin: 0 3px;
  min-width: 23px;
  text-align: center;
`;

export const ItemDelete = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0px;

  &:before {
    content: '+';
    display: block;
    transform: rotate(45deg);
    font-size: 12px;
  }
`;

export const PriceWrap = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const Price = styled.div`
  ${p => p.isDiscounted && 'text-decoration: line-through'};
`;

export const PriceVat = styled.div`
  display: block;
`;

export const SubInfoOuter = styled.div`
  font-size: 0.8rem;
`;

export const SubInfoLine = styled.div`
  margin-top: 5px;
`;
