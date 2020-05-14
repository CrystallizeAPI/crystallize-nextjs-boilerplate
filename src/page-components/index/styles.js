import styled from 'styled-components';

import { responsive, Outer as O } from 'ui';

export const Outer = styled(O)`
  max-width: 1600px;
  padding: 0;

  .crystallize-grid--css-grid {
    grid-gap: 20px;
    grid-template-rows: 700px;

    ${responsive.xs} {
      display: block !important;
      grid-template-columns: 100% !important;
    }
  }
`;
