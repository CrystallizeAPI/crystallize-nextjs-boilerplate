import styled from 'styled-components';

export const Outer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-secondary);
  font-weight: 600;
  margin-top: 24px;
  gap: 16px;

  svg {
    margin-right: 10px;
  }
`;

export const StockColorIndicator = styled.span`
  display: inline-block;
  background: ${(p) => p.color};
  border-radius: 50%;
  height: 10px;
  margin-right: 10px;
  width: 10px;
`;

export const Row = styled.div`
  font-weight: 300;
`;

export const Location = styled.b`
  font-weight: 600;
  line-height: 1.5;
`;
