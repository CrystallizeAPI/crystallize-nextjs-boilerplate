import React from 'react';

import { screen, H3 } from 'ui';
import ContentTransformer from 'ui/content-transformer';
import Link from 'components/link';
import VideoPlayer from 'components/video-player';

import {
  Outer,
  Text,
  MediaWrapper,
  MediaInner,
  Img,
  Description
} from './styles';

export default function DocumentItem({ data, colSpan = '4' }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;

  let image;
  const images = data.components?.find((c) => c.type === 'images');
  image = images?.content?.images?.[0];
  const description = data.components?.find((c) => c.name === 'Intro');
  const video = data.components?.find((c) => c.name === 'Video');

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
    return (
      <Link as={path} href="/[...catalogue]" passHref>
        <Outer span={colSpan}>
          <Text>
            <H3>{name}</H3>
            <Description>
              <ContentTransformer {...description?.content?.json} />
            </Description>
          </Text>
        </Outer>
      </Link>
    );
  }

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer span={colSpan}>
        <MediaWrapper>
          <MediaInner>{media && media}</MediaInner>
        </MediaWrapper>
        <Text>
          <H3>{name}</H3>
          <Description>
            <ContentTransformer {...description?.content?.json} />
          </Description>
        </Text>
      </Outer>
    </Link>
  );
}
