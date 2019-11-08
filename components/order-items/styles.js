import styled from 'styled-components';
import Image from '@crystallize/react-image';
import { colors, responsive } from 'ui';

export const Items = styled.div`
  display: block;
  flex-grow: 1;
  margin-right: 1rem;

  ${responsive.xs} {
    margin-right: 0;
  }
`;

export const Item = styled.div`
  color: ${colors.darkText};
  background: white;
  margin-bottom: 1rem;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const ItemAmount = styled.div`
  text-align: right;
`;

export const ItemImage = styled(Image).attrs(() => ({
  sizes: '100px'
}))`
  display: flex;
  flex: 0 0 auto;
  width: 100px;
  justify-content: center;
  align-items: center;
  margin: 0 15px 0 0;

  img {
    max-height: 100px;
  }
`;

export const ItemInfo = styled.div`
  flex-grow: 1;
`;

export const ItemName = styled.p`
  font-size: 1.4rem;
`;

export const ItemQuantity = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

export const ItemPrice = styled.div`
  font-size: 1.5rem;
`;
