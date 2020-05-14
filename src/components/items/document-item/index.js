import React from 'react';
import Link from 'next/link';
import CrystallizeContent from '@crystallize/content-transformer/react';

import { screen, H3 } from 'ui';
import VideoPlayer from 'components/video-player';

import { Outer, Text, MediaWrapper, Img, Description } from './styles';

export default function CatalogueItem({ data, colSpan = '4' }) {
  if (!data) {
    return null;
  }

  const { name, path, type } = data;

  let image;
  const images = data.components.find(c => c.type === 'images');
  image = images?.content?.images?.[0];
  const description = data.components.find(c => c.name === 'Intro');
  const video = data.components.find(c => c.name === 'Video');

  let media;

  if (video?.content?.videos?.length) {
    media = (
      <VideoPlayer
        {...video.content.videos[0]}
        autoplay
        loop
        controls={false}
      />
    );
  } else if (image) {
    media = (
      <Img
        {...image}
        alt={name}
        sizes={`(min-width ${screen.md}px) 33vw, 100vw`}
      />
    );
  } else {
    media = <div>No Media Found</div>;
  }

  return (
    <Link as={path} href={`/${type}`} passHref>
      <Outer span={colSpan}>
        <MediaWrapper>{media && media}</MediaWrapper>
        <Text>
          <H3>{name}</H3>
          <Description>
            <CrystallizeContent {...description?.content?.json} />
          </Description>
        </Text>
      </Outer>
    </Link>
  );
}
