import styled from 'styled-components';
import { H2 } from 'ui';

export const Outer = styled.aside`
  display: block;
  margin-bottom: 50px;
  padding-bottom: 10px;
`;

export const Title = styled(H2)`
  color: var(--color-text-main);
  font-size: 1rem;
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 5px;
`;
