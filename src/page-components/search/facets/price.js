import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

import { useT } from 'lib/i18n';

const Outer = styled.div``;

const Values = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  grid-template-columns: 1fr 1fr;
  input:first-child {
    border-right-color: transparent;
  }
`;

const Input = styled.input`
  background: white;
  border: 1px solid #000;
  padding: 8px 15px;

  flex: 0 1 auto;
  /* margin: 0 2%; */
  width: 100%;
`;
const RangeWrap = styled.div`
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

function InputValue({ value, onChange, ...rest }) {
  function onInputChange(evt) {
    onChange(parseFloat(evt.target.value));
  }

  return (
    <Input type="number" value={value} onChange={onInputChange} {...rest} />
  );
}

export function Price({
  min,
  max,
  value,
  onChange,
  onRangeChanging,
  onRangeFinished
}) {
  const t = useT();

  function onRangeChange(newValue) {
    onRangeChanging({ min: newValue[0], max: newValue[1] });
  }

  function onRangeDone() {
    onRangeFinished();
  }

  function onMinChange(min) {
    onChange({
      min,
      max: value.max
    });
  }

  function onMaxChange(max) {
    onChange({
      min: value.min,
      max
    });
  }

  return (
    <Outer>
      <Values>
        <InputValue
          value={value.min}
          onChange={onMinChange}
          aria-label={t('search.facets.price.min')}
        />
        <InputValue
          value={value.max}
          onChange={onMaxChange}
          aria-label={t('search.facets.price.max')}
        />
      </Values>
      <RangeWrap>
        <Range
          min={min}
          max={max}
          value={[value.min, value.max]}
          onChange={onRangeChange}
          onAfterChange={onRangeDone}
        />
      </RangeWrap>
    </Outer>
  );
}
