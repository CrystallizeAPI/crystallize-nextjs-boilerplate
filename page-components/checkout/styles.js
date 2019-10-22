import styled from 'styled-components';
import { colors, responsive } from 'ui';

export const Inner = styled.div`
  display: flex;

  ${responsive.xs} {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  background: transparent;
  color: ${colors.darkText};
  font-size: 16px;
  font-weight: 500;
  padding: 0.3rem 0;
  margin-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${colors.frost};
  transition: border 0.2s ease-in-out;

  &:valid {
    border-bottom: 1px solid ${colors.iceberg};
  }

  &:invalid {
    border-bottom: 1px solid ${colors.error};
  }

  &[value=''] {
    border-bottom: 1px solid ${colors.frost};
  }
`;

export const CardElementWrapper = styled.div`
  border-bottom: 1px solid ${colors.frost};
  padding: 0.3rem 0;
  margin-bottom: 1rem;
  transition: border 0.2s ease-in-out;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: ${colors.error};
  margin-top: 1rem;
`;

export const StripeWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

export const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.light};
  overflow: hidden;
`;

export const PaymentButton = styled.button`
  ${props => `background: ${props.active ? colors.light : 'white'}`};
  font-size: 18px;
  border-top: 1px solid ${colors.light};
  border-bottom: 1px solid ${colors.light};
  padding: 0.5rem;

  &:last-child {
    border-bottom: none;
  }
`;
