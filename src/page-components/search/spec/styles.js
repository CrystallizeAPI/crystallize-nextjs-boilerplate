import styled from 'styled-components';

import { responsive } from 'ui';

export const Outer = styled.div`
  grid-area: spec;
`;

export const Inner = styled.div`
  ${responsive.mdPlus} {
    display: flex;
    justify-content: space-between;
  }
`;

export const InputFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${responsive.mdPlus} {
    padding: 0 15px;
  }
`;

export const TotalResults = styled.div`
  font-weight: 600;
  color: #000;
`;
