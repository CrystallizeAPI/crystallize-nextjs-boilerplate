import styled from 'styled-components';
import is from 'styled-is';

export const CardElementWrapper = styled.div`
  border-bottom: 1px solid var(--color-box-background);
  padding: 0.3rem 0;
  margin-bottom: 1rem;
  transition: border 0.2s ease-in-out;

  ${is('card-error')`
    border-color: var(--color-error);
  `};

  ${is('card-ok')`
    border-color: var(--color-text-main);
  `};
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: var(--color-error);
  margin-top: 1rem;
`;
