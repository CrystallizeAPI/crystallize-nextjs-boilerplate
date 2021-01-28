import styled from 'styled-components';
import { responsive } from 'ui';

export const Outer = styled.div`
  ul {
    display: grid;
    grid-auto-rows: var(--listformat-product-height-lg);
    grid-gap: 15px;
    grid-template-columns: 1fr;
    list-style: none;

    ${responsive.smPlus} {
      grid-template-columns: repeat(2, 1fr);
    }

    ${responsive.mdPlus} {
      padding-left: 0;
      padding-right: 0;
      grid-template-columns: repeat(4, 1fr);
    }

    > li {
      margin: 0;
      padding: 0;
    }
  }
`;
