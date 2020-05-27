import styled from 'styled-components';

export const Outer = styled.div`
  flex: 1 1 auto;
  position: relative;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Items = styled.ul`
  margin: 0;
  flex-grow: 3;
  padding: 0;
  list-style: none;
  overflow-y: auto;
`;

export const BasketIsEmpty = styled.div`
  text-align: center;
  margin: 25px;
`;

export const RemainingUntilFreeShipping = styled.div`
  text-align: left;
  flex-grow: 1;
  padding: 15px 0px;
  font-size: 14px;
  margin-top: 15px;
  font-weight: 600;
  border-top: 1px dashed #dfdfdf;
`;

export const ItemOuter = styled.li`
  display: block;
  margin: 0;
`;

export const ItemIsSubscription = styled.strong`
  display: block;
  font-weight: bold;
`;
