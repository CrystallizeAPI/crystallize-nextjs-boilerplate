import styled from 'styled-components';

import { colors } from './colors';
import { responsive } from './responsive';

export const H1 = styled.h1`
  margin: 0 0 15px;
  font-size: 3rem;
  font-family: 'Roboto Slab', sans-serif;
  color: ${colors.black};

  ${responsive.smAndLess} {
    font-size: 2.5rem;
  }
`;

export const H2 = styled.h2`
  color: ${colors.black};
  font-size: 2rem;
  margin: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.5rem;
  }
`;

export const H3 = styled.h3`
  color: ${colors.black};
  font-size: 1.4rem;
  margin: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.2rem;
  }
`;
