import styled from 'styled-components';
import is from 'styled-is';

import { responsive } from 'ui';

export const Outer = styled.header`
  text-align: center;
  padding: 20px 100px;
  max-width: var(--content-max-width);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin: 0 auto 50px;

  ${responsive.smAndLess} {
    padding: 10px 65px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Logo = styled.a`
  height: 84px;
  display: block;
  object-fit: contain;
  position: relative;
  z-index: 99;
  img,
  svg {
    display: block;
    height: 100%;
  }
  ${responsive.xs} {
    height: 40px;
    width: 110px;
    margin-left: 25px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  margin: 6px 0 0 15px;
  padding-left: 15px;
  width: 100%;
  color: #000;
  font-size: 18px;
  font-family: var(--font-family-main);
  ${responsive.smAndLess} {
    display: none;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    border: none;
    background: #fafafa;
    margin: 0;
    padding: 2em;
    font-size: 1.5rem;

    ${is('open')`
      display: block;
    `};
  }
`;

export const NavList = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;

  /* Make space for logout button */
  ${responsive.smAndLess} {
    margin-top: 30px;
  }
`;

export const NavListItem = styled.li`
  margin: 0;
  padding: 0;
  display: inline-block;
  margin: 0 5px;

  > a {
    display: inline-block;
    padding: 10px 10px;
    transition: all 100ms;
    font-weight: 600;
    letter-spacing: 1px;
    &:hover {
      text-decoration: underline;
    }
  }

  ${responsive.smAndLess} {
    display: block;
  }
`;

export const Btn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 0;
  border-radius: 5px;
  justify-self: flex-end;
  margin-left: 10px;
  img,
  svg {
    width: 45px;
  }

  &:hover,
  &:active {
    background: rgba(0, 0, 0, 0.05);
  }
  ${responsive.xs} {
    width: 40px;
    height: 40px;
    margin-left: 5px;
  }
`;

export const BasketQuantity = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 11px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  right: -6px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: #080708;
  border: 3px solid #fff;
`;

export const NavActions = styled.div`
  margin: 8px 10px 0;
  display: flex;
  text-transform: uppercase;
  align-items: center;

  button,
  a {
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1.4px solid var(--color-text-main);
    color: var(--color-text-main);
    white-space: nowrap;

    cursor: pointer;

    &:hover {
      background: var(--color-text-main);
      color: var(--color-main-background);
      text-decoration: none;
    }
  }

  ${responsive.smAndLess} {
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 99;
    text-align: center;
    margin: 0;
    font-size: 1.5rem;

    ${is('open')`
      display: flex;
      justify-content: center;
    `};
  }
`;

export const PreviewBar = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  text-align: center;
`;
export const IconBar = styled.div`
  display: flex;

  > a {
    cursor: pointer;
  }
`;
