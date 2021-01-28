import React from 'react';
import Link from 'next/link';
// import { Image } from '@crystallize/react-image';
import { H3 } from 'ui';
import { Outer, Text } from './styles';

export default function FolderItem({ data }) {
  if (!data) {
    return null;
  }
  const { name, path } = data;
  // const thumbnail = data.components?.find((c) => c.name === 'Thumbnail')
  //   ?.content?.images?.[0];

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
