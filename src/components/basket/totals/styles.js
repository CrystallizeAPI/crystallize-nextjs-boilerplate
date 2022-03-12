import styled from 'styled-components';

export const Outer = styled.div`
  flex-grow: 1;
`;

export const Rows = styled.div`
  position: relative;
`;

export const SpinnerWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  font-size: 13px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const RowValue = styled.span`
  font-weight: 600;
  text-align: right;

  opacity: ${(p) => (p.hide ? '0' : '1')};
`;

export const StrikeThrough = styled.span`
  text-decoration: line-through;
`;
