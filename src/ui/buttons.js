import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';

import { Spinner } from './spinner';
import { colors } from './colors';

const STATES = {
  LOADING: 'loading'
};

const Inner = styled.span`
  flex: 1 1 auto;
  background: ${colors.grey};
  color: ${colors.frostbite};
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  padding: 16px 25px;
`;

const Outer = styled.button.attrs(() => ({
  type: 'button'
}))`
  width: ${p => (p.width ? p.width : '120px')};
  display: inline-flex;
  border-radius: 0;
  border: none;
  border: 2px solid ${colors.frostbite};
  padding: 0;
  appearance: none;
  cursor: pointer;
  text-decoration: none;

  &:hover ${Inner} {
    background: ${colors.frostbite};
    color: #fff;
  }

  &[disabled] {
    cursor: default;

    ${Inner} {
      background: #aaa;
      color: #333;
    }
  }
`;

const Text = styled.span`
  position: relative;
  z-index: 2;
  transition: opacity 100ms, transform 100ms;

  ${isNot('shown')`
    opacity: 0;
    transform: scale(0.7);
  `};
`;

const Loading = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 100ms, transform 100ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${is('shown')`
    opacity: 1;
    transform: none;
  `};

  svg {
    height: 50%;
  }
`;

export const Button = React.forwardRef(
  ({ children, state, width, ...rest }, ref) => (
    <Outer width={width} {...rest} ref={ref}>
      <Inner>
        <Text shown={state !== STATES.LOADING}>{children}</Text>
        {state === STATES.LOADING && (
          <Loading>
            <Spinner />
          </Loading>
        )}
      </Inner>
    </Outer>
  )
);

Button.displayName = 'Button';
