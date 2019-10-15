export const attributesToObject = attributesArray =>
  Object.assign(
    {},
    ...attributesArray.map(({ attribute, value }) => ({ [attribute]: value }))
  );
