import styled from 'styled-components';
import is from 'styled-is';
import { colors } from 'ui';

export const Outer = styled.div`
  margin: 30px 0;
`;

export const Dimension = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.div`
  color: #000;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

export const Values = styled.div`
  margin-left: -20px;
`;

export const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  appearance: none;
  background: transparent;
  border: none;
  padding: 8px 20px;
  margin: 0;
  cursor: pointer;
  text-transform: capitalize;
  position: relative;
  border-radius: 4px;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  ${is('selected')`
    font-weight:600;
    &:before {
      content:'';
      position:absolute;
      top:50%;
      margin-top:-4px;
      left:5px;
      width:8px;
      height:8px;
      border-radius:50%;
      background:${colors.glacier};
    }
  `};
`;
