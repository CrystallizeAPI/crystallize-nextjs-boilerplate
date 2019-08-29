import CrystallizeContent from '@crystallize/content-transformer/react';
import Image from '@crystallize/react-image';
import { H1 } from 'ui';

import { Outer, Title, Body, Images } from './styles';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H1
}) => {
  return (
    <Outer>
      {!!title && (
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
            // eslint-disable-next-line react/no-array-index-key
            <Image key={index} {...image} />
          ))}
        </Images>
      )}
    </Outer>
  );
};

export default Paragraph;
