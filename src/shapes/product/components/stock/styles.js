import styled from 'styled-components';

export const Outer = styled.div`
  align-items: center;
  display: flex;
  font-size: var(--font-size-secondary);
  font-weight: 600;
  margin-top: 50px;
  svg {
    margin-right: 10px;
  }
`;

export const StockColorIndicator = styled.span`
  background: ${(p) => p.color};
  border-radius: 50%;
  height: 10px;
  margin-left: 10px;
  width: 10px;
`;
