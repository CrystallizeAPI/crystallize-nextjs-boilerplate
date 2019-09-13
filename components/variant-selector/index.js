import { H3 } from 'ui';
import { Outer, Values, Button, Variant } from './styles';

export default ({ variants, selectedVariant, onChange }) => (
  <Outer>
    <H3>Variants</H3>
    {variants.map(variant => (
      <Variant key={variant.id}>
        <Values>
          <Button
            key={variant.id}
            selected={variant.id === selectedVariant.id}
            onClick={() => onChange(variant)}
          >
            {variant.name}
          </Button>
        </Values>
      </Variant>
    ))}
  </Outer>
);
