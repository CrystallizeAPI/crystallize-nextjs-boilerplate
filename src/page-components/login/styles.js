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
  padding: 50px 100px;

  h4 {
    margin: 20px 0px;
  }

  input {
    border: 5px solid white;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
    padding: 15px;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 0 10px 0;
  }

  p {
    margin-top: 15px;
    color: #cc5454;
  }

  ${responsive.smAndLess} {
    padding: 20px 20px;
  }
`;
