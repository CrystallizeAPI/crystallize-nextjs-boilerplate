import styled from 'styled-components';

import { responsive } from 'ui';

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 300px;
  grid-gap: 1rem;

  ${responsive.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
