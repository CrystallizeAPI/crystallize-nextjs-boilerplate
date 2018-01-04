import styled from 'styled-components';

export const Outer = styled.header`
  margin-bottom: 10px;
  text-align: center;
  padding: 10px 0;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #fff;
    transition: all 100ms;

    &:hover {
      background-color: #eee;
    }
  }
`;
