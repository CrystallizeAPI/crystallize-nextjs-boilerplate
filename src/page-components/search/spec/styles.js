import styled from 'styled-components';

export const Outer = styled.div`
  grid-area: spec;
`;

export const Inner = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 25px;
  flex-direction: column;
  padding: 0;
  align-items: center;
`;

export const InputFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;

export const TotalResults = styled.div`
  font-weight: 600;
  color: #000;
`;
