import styled from 'styled-components';
import Image from '@crystallize/react-image';
import { colors, responsive } from 'ui';

export const Inner = styled.div`
  display: flex;

  ${responsive.xs} {
    flex-direction: column;
  }
`;

export const Items = styled.div`
  display: block;
  flex-grow: 1;
  margin-right: 1rem;

  ${responsive.xs} {
    margin-right: 0;
  }
`;

export const Item = styled.div`
  color: ${colors.darkText};
  background: white;
  margin-bottom: 1rem;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

export const ItemImage = styled(Image).attrs(() => ({
  sizes: '100px'
}))`
  display: block;
  flex: 0 0 auto;
  width: 100px;
  margin: 0 15px 0 0;
`;

export const ItemName = styled.div`
  flex: 1 1 auto;
`;

export const ItemQuantity = styled.div`
  font-size: 1.5rem;
  margin: 0 10px;

  &::after {
    content: '/';
    display: inline-block;
    margin-left: 15px;
  }
`;

export const ItemPrice = styled.div`
  font-size: 1.5rem;
`;

export const ItemAttributes = styled.div`
  margin-top: 5px;
  font-size: 0.8rem;
`;

export const Attribute = styled.div`
  margin-bottom: 0.1rem;
  text-transform: capitalize;
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
  padding-bottom: 1rem;
`;
