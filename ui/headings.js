import styled from 'styled-components';

import { colors } from './colors';
import { responsive } from './responsive';

export const H1 = styled.h1`
  padding: 0 0 15px;
  font-size: 4rem;
  color: ${colors.frostbite};

  ${responsive.smAndLess} {
    font-size: 2.5rem;
  }
`;

export const H2 = styled.h2`
  padding: 5vh 20px;
  font-size: 2rem;

  ${responsive.smAndLess} {
    font-size: 1.5rem;
  }
`;
