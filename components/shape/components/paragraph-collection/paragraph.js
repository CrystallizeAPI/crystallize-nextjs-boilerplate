import Chunk from '@crystallize/content-chunk/reactChunk';
import Image from '@crystallize/react-image';
import { H1 } from 'ui';

import { P, Title, Body, Images } from './styles';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H1
}) => {
  console.log('22', body);
  return (
    <P>
      {!!title && (
        <Title>
          <HeadingComponent>{title.text}</HeadingComponent>
        </Title>
      )}
      {!!body && body.json && body.json.length > 0 && (
        <Body>
          <Chunk {...body.json} />
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
    </P>
  );
};

export default Paragraph;
