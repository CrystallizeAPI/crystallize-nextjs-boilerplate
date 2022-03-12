import React from 'react';
import Link from 'next/link';
// uncomment this if you want to add a thumbnail
// import { Image } from '@crystallize/react-image';
import { H3 } from 'ui';
import { Outer, Text } from './styles';

export default function FolderItem({ data }) {
  if (!data) {
    return null;
  }
  const { name, path } = data;
  // uncomment this if you want to add a thumbnail
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
