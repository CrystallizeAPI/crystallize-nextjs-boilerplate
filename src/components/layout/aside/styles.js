import styled from 'styled-components';

export const Outer = styled.div`
  flex: 1;
  position: relative;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--color-main-background);
  z-index: 15;
  max-height: calc(var(--vh, 1vh) * 100);
`;

export const Heading = styled.h4`
  flex: 0 0 100px;
  padding: 50px 0 35px;
  margin: 0;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Footer = styled.div`
  padding: 25px 0 0;
  flex: 0 0 auto;
`;
