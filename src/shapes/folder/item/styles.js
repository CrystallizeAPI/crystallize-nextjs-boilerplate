import styled from 'styled-components';

export const Outer = styled.a`
  height: 100%;
  color: var(--color-primary-action-content);
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-primary-action);
  padding: 15px 25px;
  transition: all 0.1s ease-in-out;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
  border: 4px solid #fff;
`;

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;

  h3 {
    font-size: var(--font-size-s);
    text-align: center;
    font-weight: 600;
    margin: 0 0 0 5px;
    color: inherit;
  }
`;
