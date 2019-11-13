import styled from 'styled-components';
import { colors, responsive } from 'ui';

export const Inner = styled.div`
  display: flex;
  padding-top: 30px;
  ${responsive.xs} {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Label = styled.div`
  font-size: 0.8rem;
  padding-left: 15px;
  opacity: 0.7;
  padding-bottom: 8px;
  font-weight: 600;
`;
export const InputGroup = styled.div`
  width: 100%;
  padding-right: 15px;
`;
export const Input = styled.input`
  background: #fff;
  width: 100%;
  color: ${colors.darkText};
  font-size: 16px;
  font-weight: 500;
  border-radius: 25px;
  padding: 15px 15px;
  margin-bottom: 0.5rem;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${colors.frost};
  transition: border 0.2s ease-in-out;
  &::placeholder {
    font-size: 12px;
    opacity: 0.5;
    padding-left: 10px;
  }
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
  overflow: hidden;
`;

export const PaymentButton = styled.button`
  /* ${props => `background: ${props.active ? colors.light : 'white'}`}; */
  background:${p => p.color};
  font-size: 18px;
  padding: 0.5rem;
  width: 32%;
  margin-right:1%;
  height: 80px;
  border-radius: 10px;
  img {
    max-width:100px;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`;
export const PaymentSelector = styled.div`
  display: flex;
`;

export const OrderItemsWrapper = styled.div`
  width: 50%;
  padding-left: 50px;
`;
