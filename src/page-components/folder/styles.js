import styled from 'styled-components';

import { responsive } from 'ui';

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;

  ${responsive.xs} {
    display: block;
  }
  ${responsive.sm} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(12, 1fr);
  }
`;
