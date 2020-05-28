import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { responsive } from 'ui';

export const Items = styled.div`
  display: block;
  width: 100%;
  margin-right: 1rem;

  ${responsive.xs} {
    margin-right: 0;
  }
`;

export const Item = styled.div`
  color: var(--color-text-sub);
  margin-bottom: 1rem;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  border-bottom: 1px dashed #dfdfdf;
`;

export const ItemAmount = styled.div`
  text-align: right;
`;

export const ItemImage = styled(Image).attrs(() => ({
  sizes: '80px',
}))`
  display: flex;
  flex: 0 0 auto;
  width: 60px;
  justify-content: center;
  align-items: center;
  margin: 0 25px 0 0;

  img {
    max-height: 100px;
  }
`;

export const ItemInfo = styled.div`
  flex-grow: 1;
`;

export const ItemName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 10px;
`;

export const ItemQuantity = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

export const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
