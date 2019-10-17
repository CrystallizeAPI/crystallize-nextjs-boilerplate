import styled from 'styled-components';
import { responsive } from 'ui';

export const Inner = styled.div`
  display: flex;

  ${responsive.xs} {
    flex-direction: column;
  }
`;
