import React from 'react';
import Link from 'next/link';
import { H3 } from 'ui';
import { Outer, Text } from './styles';

export default function FolderItem({ data }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;

  return (
    <Link href={path} passHref>
      <Outer>
        <Text>
          <H3>{name}</H3>
        </Text>
      </Outer>
    </Link>
  );
}
