import React from 'react';
import Link from 'next/link';

import { screen, H3 } from 'ui';

import { Outer, Text, ImageWrapper, Img } from './styles';

export default function FolderItem({ data, gridCell }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);

  let image;

  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];

  return (
    <Link href={path} passHref>
      <Outer>
        <ImageWrapper>
          {image && (
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageMdWidth}px, 100vw`}
            />
          )}
        </ImageWrapper>
        <Text>
          <H3>{name}</H3>
        </Text>
      </Outer>
    </Link>
  );
}
