import styled, { css } from 'styled-components';

import is from 'styled-is';

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
  color: var(--color-text-sub);
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
  margin-bottom: 0.5rem;
`;

export const AttributeButton = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  text-transform: capitalize;
  font-weight: bold;
  padding: 0.8rem;

  ${is('selected')`
    background: var(--color-text-main);
    color: var(--color-main-background);
  `};

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
