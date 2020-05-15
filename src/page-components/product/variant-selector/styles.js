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
  type: 'button',
}))`
  color: ${colors.darkText};
  width: 100%;
  font-weight: bold;
  appearance: none;
  background: white;
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

  ${is('selected')`
    background: #000;
    color: white;
    border: 1px solid #000;
  `};
`;

export const AttributeName = styled.h4`
  text-transform: uppercase;
  margin-bottom: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
`;

export const AttributeSelector = styled.div`
  display: flex;
  /* border: 1px solid #dfdfdf; */
  margin-bottom: 0.5rem;
`;

export const AttributeButton = styled.button`
  flex-grow: 1;
  /* border-right: 1px solid black; */
  flex-basis: 0;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0.8rem;

  ${(props) =>
    props.selected &&
    css`
      /* border: 1px solid black; */
      background: black;
      color: white;
    `}

  &:first-child {
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }

  &:last-child {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    border-right: none;
  }
`;
