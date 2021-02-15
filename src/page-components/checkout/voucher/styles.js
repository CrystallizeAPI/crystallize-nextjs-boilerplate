import styled from 'styled-components';
import { Input } from '../styles';

export const VoucherDisplayer = styled.div`
  display: flex;
  align-items: stretch;

  ${Input} {
    margin-bottom: 0;
  }
`;

export const ShowForm = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-text-sub);
  display: block;
  font-size: 16px;
  font-style: italic;
  margin-top: 1rem;
`;

export const VoucherApplied = styled.div`
  span {
    display: inline-block;
    padding: 5px 8px;
    background: #fff;
    margin: 0 5px 0 10px;
  }

  button {
    appearance: none;
    border: none;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;
