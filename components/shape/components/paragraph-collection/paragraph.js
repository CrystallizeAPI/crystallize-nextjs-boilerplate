import CrystallizeContent from '@crystallize/content-transformer/react';
import Image from '@crystallize/react-image';
import { H2 } from 'ui';

import { Outer, Title, Body, Images } from './styles';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H2
}) => {
  return (
    <Outer>
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
      {!!images && images.length > 0 && (
        <Images>
          {images.map((image, index) => (
            <Image key={index} {...image} sizes="80vw" />
          ))}
        </Images>
      )}
    </Outer>
  );
};

export default Paragraph;
