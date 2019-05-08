/* eslint no-unused-expressions: 0 */
import styled from 'styled-components';
import is from 'styled-is';

export const Main = styled.main`
  padding-bottom: 200px;

  ${is('loading')`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  `};
`;
