import styled from 'styled-components';

export const Outer = styled.div`
  padding: 15px;
  flex: 0 0 auto;
`;

export const Rows = styled.div`
  position: relative;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  > :last-child {
    text-align: right;

    opacity: ${p => (p.hideValue ? '0' : '1')};
  }
`;

export const StrikeThrough = styled.span`
  text-decoration: line-through;
`;
