import styled from 'styled-components';
import { colors } from './colors';
import { responsive } from './responsive';

export const Outer = styled.div`
  margin-bottom: 30px;
  max-width: 1500px;
  padding: 0 75px;
  margin: 0 auto;
  display: block;

  ${responsive.smAndLess} {
    padding: 0 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 50px;
  max-width: 800px;
  margin: ${p => (p.centerContent ? '0 auto' : '0 0 50px 0')};

  p {
    font-size: 18px;
    line-height: 1.8rem;
    color: ${colors.darkText};
  }
`;
