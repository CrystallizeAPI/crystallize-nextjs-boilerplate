import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

import { useT } from 'lib/i18n';

const Outer = styled.div``;

const Values = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  input {
    flex: 0 1 auto;
    margin: 0 2%;
    width: 35%;
  }
`;

const RangeWrap = styled.div`
  margin: 0 10px;
`;

function InputValue({ value, onChange, ...rest }) {
  function onInputChange(evt) {
    onChange(parseFloat(evt.target.value));
  }

  return (
    <input type="number" value={value} onChange={onInputChange} {...rest} />
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
