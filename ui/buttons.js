import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import { lighten, darken, desaturate } from 'polished';
import Link from 'next/link';

import { colors } from './colors';
import { Spinner } from './spinner';

const themes = {
  primary: {
    background: colors.glacier,
    backgroundHover: darken(0.1, colors.glacier),
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center'
  },
  secondary: {
    background: colors.frost,
    backgroundHover: darken(0.05, colors.frost),
    color: colors.frostbite,
    textDecoration: 'none',
    textAlign: 'center'
  },
  danger: {
    background: lighten(0.1, colors.error),
    backgroundHover: lighten(0.05, colors.error),
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center'
  }
};

const linkThemes = {
  primary: {
    background: 'transparent',
    borderBottom: '2px solid #f47f98',
    textDecoration: 'none',
    textAlign: 'left'
  }
};

function getTheme({ themesToSelectFrom, secondary, danger } = {}) {
  if (secondary) {
    return themesToSelectFrom.secondary;
  }
  if (danger) {
    return themesToSelectFrom.danger;
  }
  return themesToSelectFrom.primary;
}

const sizes = {
  tiny: {
    padding: '0px 1px',
    minWidth: '0'
  },
  small: {
    padding: '5px 10px',
    minWidth: '0'
  },
  medium: {
    padding: '10px 15px',
    minWidth: '150px',
    fontSize: '16px'
  },
  large: {
    padding: '0px 1px',
    minWidth: '0'
  },
  xlarge: {
    padding: '0px 1px',
    minWidth: '0'
  }
};

function getSize({ tiny, small, large, xlarge }) {
  if (tiny) {
    return sizes.tiny;
  }
  if (small) {
    return sizes.small;
  }
  if (large) {
    return sizes.large;
  }
  if (xlarge) {
    return sizes.xlarge;
  }
  return sizes.medium;
}

const ButtonInner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) =>
    theme.borderBottom && `border-bottom: ${theme.borderBottom}`};
  min-width: ${p => p.size.minWidth};
  background: ${p => p.theme.background};
  color: ${p => p.theme.color};
  padding: ${p => p.size.padding};
  text-align: ${p => p.theme.textAlign};
  text-decoration: ${p => p.theme.textDecoration};
  padding: ${p => p.size.padding};
  font-size: ${p => p.size.fontSize || 'inherit'};
  transition: background-color 100ms;
  position: relative;
`;

const ButtonOuter = styled.button`
  display: ${p => (p.block ? 'block' : 'inline-block')};
  border-radius: 0;
  border: none;
  padding: 0;
  appearance: none;
  cursor: pointer;
  text-decoration: none;

  &:hover ${ButtonInner} {
    ${({ theme }) =>
      theme.backgroundHover && `background-color: ${theme.backgroundHover}`};
  }

  &[disabled] {
    cursor: default;

    ${ButtonInner} {
      background: ${p => desaturate(0.5, p.theme.background)};
    }
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
  transition: opacity 100ms, transform 100ms;

  ${isNot('shown')`
    opacity: 0;
    transform: scale(0.7);
  `};
`;

const ButtonLoading = styled.span`
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

function buttonCreator({ buttonThemes, asLink }) {
  return ({
    children,
    tiny,
    small,
    large,
    xlarge,
    loading,
    block,
    ...rest
  }) => {
    const theme = getTheme({
      themesToSelectFrom: buttonThemes,
      ...rest
    });
    const size = getSize({ tiny, small, large, xlarge });
    const as = asLink ? Link : 'button';

    return (
      <ButtonOuter as={as} {...rest} theme={theme} block={block}>
        <ButtonInner theme={theme} size={size}>
          <ButtonText shown={!loading}>{children}</ButtonText>
          <ButtonLoading shown={loading}>
            <Spinner />
          </ButtonLoading>
        </ButtonInner>
      </ButtonOuter>
    );
  };
}

export const Button = buttonCreator({ buttonThemes: themes });
export const ButtonAsLink = buttonCreator({
  buttonThemes: themes,
  asLink: true
});
export const LinkButton = buttonCreator({ buttonThemes: linkThemes });
export const LinkButtonAsLink = buttonCreator({
  buttonThemes: linkThemes,
  asLink: true
});
