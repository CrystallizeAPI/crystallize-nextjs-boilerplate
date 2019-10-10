import { H3 } from 'ui';
import {
  Outer,
  AttributeName,
  AttributeSelector,
  AttributeButton,
  Variant,
  Values,
  Button
} from './styles';

const reduceAttributes = variants =>
  variants.reduce((acc, variant) => {
    const attrs = acc;

    variant.attributes.forEach(attr => {
      const currentAttribute = attrs[attr.attribute];
      if (!currentAttribute) {
        attrs[attr.attribute] = [attr.value];
        return;
      }

      const valueExists = currentAttribute.find(str => str === attr.value);
      if (!valueExists) {
        attrs[attr.attribute].push(attr.value);
      }
    });

    return attrs;
  }, {});

export default ({
  variants,
  selectedVariant,
  onVariantChange,
  onAttributeChange
}) => {
  const attributes = reduceAttributes(variants);

  if (!Object.keys(attributes).length) {
    return (
      <Outer>
        <H3>Variants</H3>
        {variants.map(variant => (
          <Variant key={variant.id}>
            <Values>
              <Button
                key={variant.id}
                selected={variant.id === selectedVariant.id}
                onClick={() => onVariantChange(variant)}
              >
                {variant.name}
              </Button>
            </Values>
          </Variant>
        ))}
      </Outer>
    );
  }

  return (
    <Outer>
      <H3>Variants</H3>

      {Object.keys(attributes).map(name => {
        const attr = attributes[name];
        const selectedAttr = selectedVariant.attributes.find(
          a => a.attribute === name
        );

        if (!selectedAttr) {
          return null;
        }

        return (
          <div>
            <AttributeName>{name}</AttributeName>
            <AttributeSelector>
              {attr.map(value => (
                <AttributeButton
                  onClick={() =>
                    onAttributeChange(selectedVariant.attributes, {
                      attribute: name,
                      value
                    })
                  }
                  type="button"
                  selected={value === selectedAttr.value}
                >
                  {value}
                </AttributeButton>
              ))}
            </AttributeSelector>
          </div>
        );
      })}
    </Outer>
  );
};
