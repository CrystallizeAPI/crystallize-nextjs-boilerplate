import React, { useState, useEffect } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useT } from 'lib/i18n';
import { Outer, Values, Input, RangeWrap } from './styles';

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

function InputValue({ value, onChange, ...rest }) {
  function onInputChange(evt) {
    onChange(parseFloat(evt.target.value));
  }

  return (
    <Input type="number" value={value} onChange={onInputChange} {...rest} />
  );
}
