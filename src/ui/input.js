import styled from 'styled-components';

import { Spinner } from 'ui/spinner';

export const InputGroup = styled.div`
  border: 1px solid var(--color-text-sub);
  border-radius: 35px;
  margin: 0 auto;
  display: grid;
  position: relative;
  align-items: center;
  grid-template-columns: 1fr 40px;
  width: 100%;
`;

export const InputButton = styled.button`
  width: 36px;
  height: 36px;
  color: #fff;
  background: #000;
  border-radius: 50%;
`;

export const Input = styled.input`
  font-size: 1rem;
  background: transparent;
  outline: none;
  padding: 12px 35px;
  border: none;
  font-size: 1rem;
`;

export const InputSpinner = styled(Spinner)`
  position: absolute;
  top: 13px;
  left: 10px;
  z-index: 1;
`;
