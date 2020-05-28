import styled from 'styled-components';

export const Header = styled.h4`
  flex: 0 0 100px;
  padding: 50px 0;
  align-items: center;
  position: relative;
`;

export const Basket = styled.div`
  position: relative;
  height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--color-main-background);
  z-index: 15;
`;

export const Footer = styled.div`
  padding: 0px 0 50px;
`;
