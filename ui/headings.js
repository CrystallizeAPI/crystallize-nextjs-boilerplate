import styled from 'styled-components';

import { colors } from './colors';
import { responsive } from './responsive';

export const H1 = styled.h1`
  padding: 0 0 15px;
  font-size: 4rem;
  font-family: 'Roboto Slab', sans-serif;
  color: ${colors.frostbite};

  ${responsive.smAndLess} {
    font-size: 2.5rem;
  }
`;

export const H2 = styled.h2`
  color: ${colors.frostbite};
  font-size: 2rem;
  padding: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.5rem;
  }
`;

export const H3 = styled.h3`
  color: ${colors.frostbite};
  font-size: 1.4rem;
  padding: 1rem 0;

  ${responsive.smAndLess} {
    font-size: 1.2rem;
  }
`;
