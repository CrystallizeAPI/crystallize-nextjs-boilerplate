import styled from 'styled-components';

const Outer = styled.div`
  input {
    margin-right: 5px;
  }
`;

export default function SingleFacetValue({
  attribute,
  value,
  count,
  spec,
  onChange
}) {
  const checked = !!spec.filter?.productVariants?.attributes?.some((attr) => {
    return attr.attribute === attribute && attr.values.includes(value);
  });

  function onInputChange(evt) {
    onChange({ attribute, value, checked: evt.target.checked });
  }

  return (
    <Outer>
      <label>
        <input type="checkbox" checked={checked} onChange={onInputChange} />
        {value} ({count})
      </label>
    </Outer>
  );
}
