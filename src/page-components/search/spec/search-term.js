import React, { useState } from 'react';
import styled from 'styled-components';

import { InputGroup as IG, Input as I, InputButton as IB } from 'ui';
const Input = styled(I)`
  padding-left: 20px;
`;
const InputGroup = styled(IG)`
  border-radius: 0;
`;

const InputButton = styled(IB)`
  border-radius: 0;
`;
export default function SearchTerm({ searchTerm, onChange }) {
  const [term, setTerm] = useState(searchTerm || '');
  return (
    <InputGroup
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        onChange(term);
      }}
    >
      <Input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <InputButton type="submit">➔</InputButton>
    </InputGroup>
  );
}
