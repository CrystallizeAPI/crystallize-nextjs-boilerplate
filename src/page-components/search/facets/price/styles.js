import styled from 'styled-components';

export const Outer = styled.div``;

export const Values = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  grid-template-columns: 1fr 1fr;
  input:first-child {
    border-right-color: transparent;
  }
`;

export const Input = styled.input`
  background: white;
  border: 1px solid #000;
  padding: 8px 15px;

  flex: 0 1 auto;
  /* margin: 0 2%; */
  width: 100%;
`;
export const RangeWrap = styled.div`
  margin: 0 10px;
  .rc-slider-track {
    background: #000;
  }
  .rc-slider-handle {
    border-color: #000;
    &.rc-slider-handle-dragging {
      border-color: #000;
      box-shadow: 0 0 0 5px #000;
    }
  }
`;
