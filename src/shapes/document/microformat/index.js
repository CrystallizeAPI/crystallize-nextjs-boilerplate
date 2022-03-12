import React from 'react';
import Link from 'next/link';

import { screen, H3 } from 'ui';
import VideoPlayer from 'components/video-player';
import TopicTag from 'components/topic-tag';

import { Outer, Text, MediaWrapper, Img, Tags, Inner } from './styles';

export default function DocumentItem({ data }) {
  if (!data) {
    return null;
  }

  const { name, path } = data;
  const images = data.components?.find((c) => c.type === 'images');
  const image = images?.content?.images?.[0];
  const video = data.components?.find((c) => c.name === 'Video');

  let media;

  if (video?.content?.videos?.length) {
    media = (
      <VideoPlayer
        {...video.content.videos[0]}
        autoPlay
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
    media = null;
  }

  return (
    <Link href={path} passHref>
      <Outer>
        <Inner>
          {!!media && <MediaWrapper>{media}</MediaWrapper>}
          <Text>
            <Tags>
              {data?.topics?.map((topic) => (
                <TopicTag
                  {...topic}
                  key={`listing-${topic.id}-${data?.id}`}
                  underline
                />
              ))}
            </Tags>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  );
}
