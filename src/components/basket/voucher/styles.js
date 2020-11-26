import styled from 'styled-components';
import { Button } from 'ui';

export const Outer = styled.div`
  flex-grow: 1;
`;

export const VoucherButton = styled(Button)`
  width: 100%;
  margin: 20px 0;
  border: 2px solid var(--color-text-main);
  padding: 10px 20px;
  display: block;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:not([disabled]):hover {
    background: var(--color-text-main);
    color: var(--color-main-background);
    text-decoration: none;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
    text-decoration: none;
  }
`;

export const VoucherInput = styled.input`
  width: 100%;
  margin: 20px 0;
  border: 2px solid var(--color-text-main);
  display: block;
`;
