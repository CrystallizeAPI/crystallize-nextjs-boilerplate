import React, { useState, useEffect } from 'react';
import { Range } from 'rc-slider';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';

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

export function Price({ min, max, value, onChange }) {
  const t = useT();
  const [priceValue, setPriceValue] = useState(value);

  useEffect(() => {
    setPriceValue(value);
  }, [value]);

  function onRangeChange(newValue) {
    setPriceValue({ min: newValue[0], max: newValue[1] });
  }

  function onRangeDone() {
    onChange(priceValue);
  }

  function onMinChange(min) {
    onChange({
      min,
      max: priceValue.max > min ? priceValue.max : max
    });
  }

  function onMaxChange(max) {
    onChange({
      min: priceValue.min < max ? priceValue.min : min,
      max
    });
  }

  return (
    <Outer>
      <Values>
        <InputValue
          value={priceValue.min}
          onChange={onMinChange}
          aria-label={t('search.facets.price.min')}
        />
        <InputValue
          value={priceValue.max}
          onChange={onMaxChange}
          aria-label={t('search.facets.price.max')}
        />
      </Values>
      <RangeWrap>
        <Range
          min={min}
          max={max}
          value={[priceValue.min, priceValue.max]}
          onChange={onRangeChange}
          onAfterChange={onRangeDone}
        />
      </RangeWrap>
    </Outer>
  );
}
