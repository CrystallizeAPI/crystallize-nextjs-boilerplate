import {
  Outer,
  // AttributeName,
  AttributeSelector,
  AttributeButton,
  Variant,
  Values,
  Button
} from './styles';

const reduceAttributes = variants =>
  variants.reduce((acc, variant) => {
    const attrs = acc;

    variant.attributes.forEach(({ attribute, value }) => {
      const currentAttribute = attrs[attribute];
      if (!currentAttribute) {
        attrs[attribute] = [value];
        return;
      }

      const valueExists = currentAttribute.find(str => str === value);
      if (!valueExists) {
        attrs[attribute].push(value);
      }
    });

    return attrs;
  }, {});

const VariantSelector = ({
  variants,
  selectedVariant,
  onVariantChange,
  onAttributeChange
}) => {
  const attributes = reduceAttributes(variants);

  if (!Object.keys(attributes).length) {
    return (
      <Outer>
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
      {Object.keys(attributes).map(name => {
        const attr = attributes[name];
        const selectedAttr = selectedVariant.attributes.find(
          a => a.attribute === name
        );

        if (!selectedAttr) {
          return null;
        }

        return (
          <div key={name}>
            {/* <AttributeName>{name}</AttributeName> */}
            <AttributeSelector>
              {attr.map(value => (
                <AttributeButton
                  key={value}
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

VariantSelector.displayName = 'VariantSelector';

export default VariantSelector;
