import React from 'react';
import { Attributes, Attribute } from './styles';

const AttributeList = ({ attributes }) => (
  <Attributes>
    {attributes.map(({ attribute, value }) => (
      <Attribute key={attribute}>{value}</Attribute>
    ))}
  </Attributes>
);

export default AttributeList;
