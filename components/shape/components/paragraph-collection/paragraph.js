import Chunk from '@crystallize/content-chunk/reactChunk';
import Image from '@crystallize/react-image';
import { H1 } from 'ui';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H1
}) => {
  return (
    <>
      {!!title && <HeadingComponent>{title.text}</HeadingComponent>}
      {!!body && body.json && body.json.length > 0 && <Chunk {...body.json} />}
      {!!images &&
        images.length > 0 &&
        // eslint-disable-next-line react/no-array-index-key
        images.map((image, index) => <Image key={index} {...image} />)}
    </>
  );
};

export default Paragraph;
