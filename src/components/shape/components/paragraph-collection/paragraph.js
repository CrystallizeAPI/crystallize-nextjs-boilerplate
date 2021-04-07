import ContentTransformer from 'ui/content-transformer';
import { H3 } from 'ui';

import { Outer, Title, Body, Text, Media } from './styles';
import Images from '../images';
import Videos from '../videos';

const Paragraph = ({
  body,
  title,
  images,
  videos,
  headingComponent: HeadingComponent = H3
}) => {
  const hasText = !!body?.json?.length;
  const hasMedia = !!images || !!videos;

  return (
    <Outer $media={hasMedia} $text={hasText}>
      <Text>
        {!!title && title.text && (
          <Title>
            <HeadingComponent>{title.text}</HeadingComponent>
          </Title>
        )}
        {hasText && (
          <Body>
            <ContentTransformer json={body.json} />
          </Body>
        )}
      </Text>
      {hasMedia && (
        <Media>
          <Images images={images} />
          <Videos videos={videos} />
        </Media>
      )}
    </Outer>
  );
};

export default Paragraph;
