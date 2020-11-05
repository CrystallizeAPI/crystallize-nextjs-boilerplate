import styled from 'styled-components';
import is from 'styled-is';

import { responsive } from 'ui';

export const Outer = styled.div`
  ${responsive.smAndLess} {
    display: none;

    ${is('$show')`
      display: block;
      background: #fff;
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      height: calc(var(--vh) * 100);
      width: 100%;
      overflow-y: auto;
      padding: 50px 15px 85px;
    `};
  }
  ${responsive.mdPlus} {
    grid-area: facets;
  }
`;

export const FacetTitle = styled.h4`
  margin: 0 0 15px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #000;
  display: flex;
  justify-content: space-between;
  min-height: 15px;

  > span {
    margin-right: 15px;
  }

  button {
    visibility: hidden;
    opacity: 0;
    transition: opacity 250ms;
  }
`;

export const Facet = styled.div`
  border-top: 1px solid #dfdfdf;
  padding-top: 35px;

  &:not(:last-child) {
    margin-bottom: 35px;
  }

  ${responsive.smAndLess} {
    &:first-child {
      border: none;
    }
  }

  &:hover ${FacetTitle} {
    button {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const FacetMobileButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;

  ${responsive.mdPlus} {
    display: none;
  }
`;

export const FacetMobileCloseButton = styled.div`
  display: none;

  ${responsive.smAndLess} {
    display: block;
    position: fixed;
    right: 15px;
    bottom: 15px;
    z-index: 1;
  }
`;
