import styled from 'styled-components';

const Outer = styled.div`
  padding: 4px 0;
  input {
    margin-right: 5px;
    border: 1px solid #000;
    border-radius: 0;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    color: #000;
  }
`;
const Count = styled.span`
  font-weight: 600;
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
        <span>
          <input type="checkbox" checked={checked} onChange={onInputChange} />
          {value}
        </span>
        <Count>({count})</Count>
      </label>
    </Outer>
  );
}
