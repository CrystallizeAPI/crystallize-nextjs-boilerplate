import styled from 'styled-components';

export const Outer = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  font-size: var(--font-size-secondary);
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`;

export const StockIndicator = styled.span`
  width: 10px;
  height: 10px;
  background: ${(p) => p.color};
  border-radius: 50%;
  margin-left: 10px;
`;
