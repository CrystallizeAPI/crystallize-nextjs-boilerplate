import styled from 'styled-components';

import { mediaXs } from 'components/style/vars';

export const Outer = styled.header`
  text-align: center;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaXs} {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  height: 64px;
  display: block;
  object-fit: contain;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    display: inline-block;
    margin: 0 5px;
    padding: 5px 10px;
    transition: all 100ms;

    &:hover {
      text-decoration: underline;
    }
  }
`;
