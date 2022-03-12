import { Outer, Label, Input, Count } from './styles';

export function FacetCheckbox({
  attribute,
  value,
  count,
  isChecked,
  onChange
}) {
  function handleChange(evt) {
    onChange({ attribute, value, isChecked: evt.target.checked });
  }

  return (
    <Outer>
      <Label>
        <span>
          <Input type="checkbox" checked={isChecked} onChange={handleChange} />
          {value}
        </span>
        <Count>({count})</Count>
      </Label>
    </Outer>
  );
}
