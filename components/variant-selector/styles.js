import styled, { css } from 'styled-components';
import { darken } from 'polished';
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
  font-weight: bold;
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
  border: 1px solid #cecece;
  border-radius: 5px;

  ${is('selected')`
    background: ${darken(0.1, colors.glacier)};
    color: white;
    border: 1px solid ${darken(0.1, colors.glacier)};
  `};
`;

export const AttributeName = styled.h4`
  text-transform: capitalize;
  margin-bottom: 0.2rem;
`;

export const AttributeSelector = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const AttributeButton = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  text-transform: capitalize;
  border: 1px solid ${colors.light};
  font-weight: bold;
  padding: 0.5rem;

  ${props =>
    props.selected &&
    css`
      background: ${darken(0.1, colors.glacier)};
      color: white;
      border: 1px solid ${darken(0.1, colors.glacier)};
    `}

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  &:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;
