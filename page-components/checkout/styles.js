import styled from 'styled-components';
import Image from '@crystallize/react-image';

export const Outer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
`;

export const Inner = styled.div`
  flex: 1 1 auto;
  padding: 30px;
`;

export const Items = styled.div`
  display: block;
`;

export const Item = styled.div`
  margin: 0 0 10px;
  border: 1px solid #eee;
  padding: 15px;
  display: flex;
  align-items: center;
`;

export const ItemImage = styled(Image).attrs(() => ({
  sizes: '100px'
}))`
  display: block;
  flex: 0 0 auto;
  width: 100px;
  margin: 0 15px 0 0;
`;

export const ItemName = styled.div`
  flex: 1 1 auto;
`;

export const ItemQuantity = styled.div`
  font-size: 1.5rem;
  margin: 0 10px;

  &::after {
    content: '/';
    display: inline-block;
    margin-left: 15px;
  }
`;

export const ItemPrice = styled.div`
  font-size: 1.5rem;
`;
