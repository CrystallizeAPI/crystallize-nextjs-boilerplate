import styled from 'styled-components';

import { responsive } from 'ui';

export const Outer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoginStyle = styled.div`
  text-align: center;

  form {
    background: var(--color-box-background);
    padding: 50px;
    margin: 100px auto 0;
    max-width: 700px;
  }

  h4 {
    margin: 0 auto;
    max-width: 400px;
  }

  p {
    margin: 50px 20px;
  }
`;

export const Fields = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  input {
    flex: 1 1 auto;
    border: 2px solid #000;
    border-right-width: 0;
    padding: 15px;
    margin: 0;
  }

  button {
    flex: 0 0 auto;
  }

  ${responsive.smAndLess} {
    display: block;

    input {
      width: 100%;
      min-width: auto;
      border-right-width: 2px;
      margin-bottom: 20px;
    }
  }
`;
