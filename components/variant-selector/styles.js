import styled from 'styled-components';
import is from 'styled-is';
import { colors } from 'ui';

export const Outer = styled.div`
  margin: 30px 0;
`;

export const Variant = styled.div`
  margin-bottom: 15px;
`;

export const Values = styled.div``;

export const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  color: ${colors.darkText};
  width: 100%;
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
    background: white;
  }
  border: 2px solid #cecece;
  border-radius: 5px;

  ${is('selected')`
    font-weight:600;
    background: white;
    border: 2px solid ${colors.glacier};
  `};
`;
