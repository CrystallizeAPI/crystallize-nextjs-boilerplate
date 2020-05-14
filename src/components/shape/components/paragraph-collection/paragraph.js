import CrystallizeContent from '@crystallize/content-transformer/react';
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
  return (
    <Outer>
      <Text>
        {!!title && title.text && (
          <Title>
            <HeadingComponent>{title.text}</HeadingComponent>
          </Title>
        )}
        {!!body && body.json && body.json.length > 0 && (
          <Body>
            <CrystallizeContent {...body.json} />
          </Body>
        )}
      </Text>
      <Media>
        <Images images={images} />
        <Videos videos={videos} />
      </Media>
    </Outer>
  );
};

export default Paragraph;
