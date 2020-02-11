import styled from 'styled-components';

import { responsive } from 'ui';

export const CssGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.totalColSpan}, 1fr);
  grid-auto-rows: 300px;
  grid-gap: 1rem;

  ${responsive.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }

  ${responsive.xs} {
    grid-template-columns: 1fr;
    grid-auto-rows: 150px;
  }
`;
