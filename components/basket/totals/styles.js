import styled from 'styled-components';

export const Outer = styled.div`
  flex-grow: 1;
`;

export const Rows = styled.div`
  position: relative;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  font-size: 13px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }

  > :last-child {
    font-weight: 600;
    text-align: right;

    opacity: ${p => (p.hideValue ? '0' : '1')};
  }
`;

export const StrikeThrough = styled.span`
  text-decoration: line-through;
`;
