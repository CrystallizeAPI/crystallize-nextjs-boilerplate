import styled from 'styled-components';
import { Input } from '../styles';

export const VoucherDisplayer = styled.div`
  display: flex;
  align-items: stretch;

  ${Input} {
    margin-bottom: 0;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-text-sub);
  display: block;
  font-size: 16px;
  font-style: italic;
  margin-top: 1rem;
`;
