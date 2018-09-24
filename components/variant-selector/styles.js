import styled from 'styled-components';
import is from 'styled-is';

export const Outer = styled.div`
  margin: 30px 0;
`;

export const Dimension = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.div`
  color: #000;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

export const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #000;
`;

export const Button = styled.button.attrs({
  type: 'button'
})`
  flex: 1 0 33%;
  appearance: none;
  background: transparent;
  border: none;
  padding: 8px 5px;
  margin: 0;
  cursor: pointer;
  text-transform: capitalize;

  &:not(:last-child) {
    border-right: 1px solid #000;
  }

  ${is('selected')`
    background: #000;
    color: #fff;
  `};
`;
