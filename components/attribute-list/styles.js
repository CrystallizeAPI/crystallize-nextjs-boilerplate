import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from 'ui';

export const Attributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export const Attribute = styled.div`
  /* background: ${darken(0.1, colors.glacier)}; */
  color: ${darken(0.2, colors.glacier)};
  font-size: 0.8rem;
  border: 0.5px solid #dfdfdf;
  text-transform: capitalize;
  margin-bottom: 0.2rem;
  margin-right: 0.2rem;
  padding: 0.3rem;
  border-radius: 0.2rem;
  /* box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05); */
`;
