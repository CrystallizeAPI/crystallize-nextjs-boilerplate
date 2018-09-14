import styled from 'styled-components';

import { responsive } from 'ui';

export const Outer = styled.div`
  margin-bottom: 30px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${responsive.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(6, 1fr);
  }
`;
