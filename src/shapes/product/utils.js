export function isSumaryComponent({ name }) {
  return name === 'Summary';
}

export function isDescriptionComponent({ name }) {
  return name === 'Description';
}

export function isSpecsComponent({ name }) {
  return name === 'Specs';
}

export function isRelatedProductsComponent({ name }) {
  return name === 'Related products';
}

export function findDefaultVariant(variants) {
  return variants?.find((variant) => variant.isDefault);
}
