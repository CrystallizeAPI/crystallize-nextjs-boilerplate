import styled from 'styled-components';
import { Button } from 'ui';

export const Outer = styled.div`
  flex-grow: 1;
  /* padding: 10px; */
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const VoucherButton = styled(Button)`
  width: 100%;
  border: 1px solid var(--color-text-main);
  padding: 5px 2px;
  display: block;
  min-width: 0px;
  font-size: 16px;
  background: #000;
  font-weight: 600;
  text-align: center;
  span {
    color: #fff;
    background: #000;

    padding: 0;
  }
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
  /* margin: 20px 0; */
  height: 40px;
  padding-left: 10px;
  background: #efefef;
  border: none;
  /* border: 2px solid var(--color-text-main); */
  /* display: block; */
`;

export const VoucherFeedback = styled.div`
  display: block;
  font-weight: 600;
  p {
    font-size: 14px;
    padding: 10px 0 5px;
  }
  /* padding: 5px 10px; */
`;

export const OpenVoucherBtn = styled.button`
  font-weight: 600;
  display: flex;
  width: 100%;
  padding: 5px 0;
  margin: 0;
  justify-content: space-between;
  font-size: 14px;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
