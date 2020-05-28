/* eslint no-unused-expressions: 0 */
import styled from 'styled-components';

export const Main = styled.main`
  padding-bottom: 50px;
  border-style: solid;
  border-color: var(--color-main-background);
`;

export const LoadingWrapper = styled.div`
  margin: 5em;
  min-height: calc(75vh - 10em);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerWrapper = styled.div`
  margin-bottom: 50px;
  text-align: center;
`;

export const LoadingTextWrapper = styled.div`
  text-align: center;
`;
