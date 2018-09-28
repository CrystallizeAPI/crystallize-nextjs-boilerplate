import isarray from 'isarray';
import deepAssign from 'deep-assign';
import changeCase from 'change-case';

// Converts content_fields into an object with easy accessible field props
export function normalizeContentFields(obj) {
  if (!obj) {
    return obj;
  }

  const normalized = deepAssign({}, obj);
  const { content_fields } = normalized;
  if (isarray(content_fields)) {
    normalized.content_fields = content_fields.reduce(
      (acc, { name, ...field }) => {
        acc[changeCase.camelCase(name.toLowerCase())] = field;
        return acc;
      },
      {}
    );
  }

  if (isarray(normalized.children)) {
    normalized.children = normalized.children.map(normalizeContentFields);
  }

  return normalized;
}
