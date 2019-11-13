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

export const Row = styled.div`
  /* display: flex; */
  width: 100%;
  /* justify-content: space-between; */
`;
export const ItemDelete = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0px;
  display: none;

  &:before {
    content: '+';
    display: block;
    transform: rotate(45deg);
    font-size: 12px;
  }
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  position: relative;

  ${p =>
    p.animate &&
    css`
      animation: ${animationItemHighlight} ${animationSpeedMs}ms 1;
    `};
  &:hover {
    ${ItemDelete} {
      display: block;
    }
  }
`;

export const ItemInfo = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export const ItemInfoText = styled.div``;

export const ItemImage = styled(CrystallizeImage).attrs(() => ({
  sizes: '50px'
}))`
  width: 50px;
  img {
    top: 50%;
    position: relative;
    transform: translateY(-50%);
  }
`;

export const ItemName = styled.div``;

export const ItemQuantityChanger = styled.span`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  button {
    margin: 6px 0;
  }
`;

export const ItemQuantity = styled.span`
  display: inline-block;
  margin: 0 3px;
  min-width: 23px;
  text-align: center;
`;

export const PriceWrapper = styled.div`
  /* display: flex; */
  font-size: 14px;
  padding: 5px 10px 0 0;
  /* justify-content: space-between; */
`;
export const PriceWrap = styled.div`
  display: flex;
`;

export const Price = styled.div`
  ${p => p.isDiscounted && 'text-decoration: line-through'};
`;

export const PriceVat = styled.div`
  display: block;
  font-size: 12px;
`;

export const SubInfoOuter = styled.div`
  font-size: 0.8rem;
`;

export const SubInfoLine = styled.div`
  margin-top: 5px;
`;
