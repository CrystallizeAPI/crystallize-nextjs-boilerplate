import { Outer, Label, Values, Button, Dimension } from './styles';

export default ({ dimensions, selectedVariant, onDimensionValueChange }) => (
  <Outer>
    {dimensions.map(d => (
      <Dimension key={d.id}>
        <Label>{d.name}</Label>
        <Values>
          {d.values.map(value => {
            const attr = selectedVariant.attributes.find(
              a => a.attribute_key === d.name
            );
            const selected = attr && attr.attribute_value === value.name;

            return (
              <Button
                key={value.id}
                selected={selected}
                onClick={() =>
                  onDimensionValueChange({
                    dimension: d,
                    value
                  })
                }
              >
                {value.name}
              </Button>
            );
          })}
        </Values>
      </Dimension>
    ))}
  </Outer>
);
