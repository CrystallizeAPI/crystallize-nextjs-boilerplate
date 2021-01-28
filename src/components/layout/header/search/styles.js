import styled from 'styled-components';
import is from 'styled-is';
import { responsive } from 'ui';

export const SearchWrapper = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 10;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.05);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.2s ease-in-out;
  max-height: 100vh;
  ${responsive.smAndLess} {
    padding: 0 25px;
  }

  ${is('isOpen')`
    transform: translateY(-0);
    opacity: 1;
  `}
`;
export const SearchLabel = styled.label`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0 0 15px;
  display: block;
  ${responsive.smAndLess} {
    padding: 0 0 15px 25px;
    text-align: left;
  }
`;

export const Outer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding-top: 60px;
  padding-bottom: 25px;
  min-height: 180px;
  width: 100%;
  position: relative;
  ${responsive.smAndLess} {
    border-top: 1px solid #dfdfdf;
    padding-top: 40px;
    margin-top: 120px;
    max-width: 100%;
  }
`;

export const Result = styled.div`
  top: 120px;
  left: 0;
  width: 100%;
  background: #fff;
  text-align: left;
  > h3 {
    margin: 0;
    font-size: 14px;
    padding: 15px 35px;
    padding-bottom: 0;
  }

  ul {
    min-height: 40px;
    transition: height 0.15s ease-in-out;
    display: block;
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    overflow: hidden;

    li {
      margin: 0;
      padding: 0;
    }

    a {
      font-size: 0.9rem;
      display: block;
      padding: 10px 35px;
      background: transparent;
      border-radius: 0;
      &:active,
      &:focus {
        outline: none;
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
`;
export const BodyOverlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0%;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

export const CloseBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  right: 30px;
  top: 30px;
  ${responsive.smAndLess} {
    display: none;
  }
  &:hover {
    background: #efefef;
  }

  &:before,
  &:after {
    border-radius: 4px;
    position: absolute;
    right: 10px;
    width: 30px;
    height: 3px;
    background: black;
    content: '';
    transition: all 0.1s ease-in-out;
  }
  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
`;
