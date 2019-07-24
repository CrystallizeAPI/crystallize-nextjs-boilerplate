import styled from 'styled-components';

export const Outer = styled.div`
  padding-bottom: 15px;
`;

export const Items = styled.ul`
  flex: 1 1 auto;
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
`;

export const BasketIsEmpty = styled.div`
  text-align: center;
  margin: 25px;
`;

export const RemainingUntilFreeShipping = styled.div`
  text-align: center;
`;

export const ItemOuter = styled.li`
  display: block;
  margin: 0;
`;

export const ItemIsSubscription = styled.strong`
  display: block;
  font-weight: bold;
`;
