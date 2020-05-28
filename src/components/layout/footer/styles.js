import styled from 'styled-components';

export const Outer = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1600px;
  margin: 50px auto;
  border-top: 2px solid var(--color-box-background);
  padding: 50px 50px;
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: 70px;
`;

export const Powered = styled.div`
  width: 100%;
  display: block;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;

  p {
    margin: 0;
  }

  svg {
    width: 120px;
  }
`;

export const NavList = styled.footer`
  list-style: none;
  font-weight: 500;
  font-size: 1rem;
  display: block;
  margin: 0 0 0 auto;

  li {
    line-height: 1.5rem;
  }
  h5 {
    font-size: 0.7rem;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;
