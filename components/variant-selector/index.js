import { Outer, Values, Button, Dimension } from './styles';

export default ({ dimensions, selectedVariant, onVariantValueChange }) => (
  <Outer>
    {dimensions.map(d => (
      <Dimension key={d.id}>
        <Values>
          <Button
            key={d.id}
            selected={d.id === selectedVariant.id}
            onClick={() =>
              onVariantValueChange({
                dimensionId: d.id
              })
            }
          >
            {d.name}
          </Button>
        </Values>
      </Dimension>
    ))}
  </Outer>
);
