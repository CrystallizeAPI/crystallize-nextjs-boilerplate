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
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 30px;
  grid-gap: 15px;
  ${responsive.smAndLess} {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.div`
  font-size: 0.7rem;
  /* padding-left: 15px; */
  opacity: 1;
  text-transform: uppercase;
  padding-bottom: 8px;
  font-weight: 600;
`;
export const InputGroup = styled.div`
  width: 100%;
  padding-right: 15px;
`;

export const Input = styled.input`
  background: var(--color-main-background);
  width: 100%;
  color: var(--color-text-sub);
  font-size: 16px;
  font-weight: 500;
  padding: 15px 15px;
  margin-bottom: 0.5rem;
  border: none;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid var(--color-box-background);
  transition: border 0.2s ease-in-out;
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
  font-size: 16px;
  color: var(--color-error);
  margin-top: 1rem;
`;

export const StripeWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

export const PaymentProviders = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PaymentButton = styled.button`
  background: ${(p) => p.color};
  font-size: 18px;
  padding: 0.5rem;
  width: 32%;
  margin-right: 1%;
  height: 80px;
  border-radius: 10px;

  img {
    max-width: 100px;
    max-height: 25px;
    display: block;
    margin: 0 auto;
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
`;

export const SectionHeader = styled(H3)`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 75px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 75px 50px 75px;
  background: var(--color-box-background);

  ${responsive.smAndLess} {
    margin-bottom: 25px;
    padding: 0 40px 40px 40px;
  }
`;
