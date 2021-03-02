import styled from 'styled-components';

import is from 'styled-is';

export const Outer = styled.div`
  margin: 30px 0;
`;

export const Variant = styled.div`
  margin-bottom: 15px;
`;

export const Values = styled.div``;

export const Button = styled.button.attrs(() => ({
  type: 'button'
}))`
  appearance: none;
  background: white;
  border: none;
  color: var(--color-text-sub);
  cursor: pointer;
  font-weight: bold;
  margin: 0;
  padding: 8px 20px;
  position: relative;
  text-transform: capitalize;
  width: 100%;
  &:focus,
  &:active {
    outline: none;
  }

  ${is('selected')`
    background: #000;
    color: white;
    border: 1px solid #000;
  `};
`;

export const AttributeName = styled.h4`
  color: var(--color-text-main);
  font-size: var(--font-size-s);
  font-weight: 600;
  margin: 25px 0 10px;
`;

export const AttributeSelector = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const AttributeButton = styled.button`
  align-items: flex-end;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  justify-content: center;
  padding: 10px 0;
  text-transform: capitalize;
  width: 25%;
  ${is('selected')`
    border-color: var(--color-text-main);
  `};

  ${({ hasVariantForAttribute }) =>
    !hasVariantForAttribute &&
    `
      position: relative;
      :after {
        background-color: rgba(1,1,1,0.05);
        bottom: 0;
        content: "";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }
    `}
`;

export const VariantImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  max-width: 100px;
  position: relative;
  width: 100%;
`;
