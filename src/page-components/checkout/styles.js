import styled from 'styled-components';
import is from 'styled-is';

import { responsive, H3, Outer as GlobalOuter } from 'ui';

export const Outer = styled(GlobalOuter)`
  ${is('center')`
    padding-top: 20vh;
    text-align: center;
  `};
`;

export const Inner = styled.div`
  ${responsive.smPlus} {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr;
    padding-top: 30px;
  }
`;

export const Label = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 1;
  padding-bottom: 8px;
  text-transform: uppercase;
`;
export const InputGroup = styled.div`
  width: 100%;
  padding-right: 15px;
`;

export const Input = styled.input`
  background: var(--color-main-background);
  border-bottom: 1px solid var(--color-box-background);
  border: none;
  color: var(--color-text-sub);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  padding: 15px 15px;
  transition: border 0.2s ease-in-out;
  width: 100%;

  &::placeholder {
    font-size: 12px;
    opacity: 0.5;
    padding-left: 10px;
  }

  &:valid {
    border-bottom: 1px solid #b7e2e4;
  }

  &:invalid {
    border-bottom: 1px solid var(--color-error);
  }

  &[value=''] {
    border-bottom: 1px solid var(--color-box-background);
  }
`;

export const ErrorMessage = styled.p`
  color: var(--color-error);
  font-size: 16px;
  margin-top: 1rem;
`;

export const StripeWrapper = styled.div`
  padding-bottom: 1rem;
  width: 100%;
`;

export const PaymentProviders = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PaymentButton = styled.button`
  background: ${(p) => p.color};
  border-radius: 10px;
  font-size: 18px;
  height: 80px;
  margin-right: 1%;
  margin-bottom: 3%;
  padding: 0.5rem;
  min-width: 125px;

  img {
    display: block;
    margin: 0 auto;
    max-height: 25px;
    max-width: 100px;
  }

  &:last-child {
    border-bottom: none;
  }

  opacity: 0.5;
  ${is('selected')`
    opacity: 1;
  `};
`;

export const PaymentProvider = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`;

export const PaymentSelector = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${responsive.mdPlus} {
    flex-wrap: no-wrap;
  }
`;

export const SectionHeader = styled(H3)`
  border-bottom: 1px solid #dfdfdf;
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
  padding-bottom: 20px;
  text-transform: uppercase;
`;

export const CheckoutFormGroup = styled.div`
  ${(props) =>
    props.withUpperMargin &&
    `
    margin-top: 50px;
  `}
`;

export const Container = styled.div`
  background: var(--color-box-background);
  margin-bottom: 25px;
  padding: 50px 30px;
  width: 100%;

  ${responsive.smPlus} {
    margin-bottom: 0;
  }

  ${responsive.mdPlus} {
    padding: 50px 75px;
  }
`;
