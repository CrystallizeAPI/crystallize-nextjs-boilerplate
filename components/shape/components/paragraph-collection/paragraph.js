import Chunk from '@crystallize/content-chunk/reactChunk';
import Image from '@crystallize/react-image';
import { H1 } from 'ui';

const Paragraph = ({
  body,
  title,
  media,
  headingComponent: HeadingComponent = H1
}) => (
  <>
    {!!title && <HeadingComponent>{title.text}</HeadingComponent>}
    {!!body && body.json && body.json.length > 0 && <Chunk {...body.json} />}
    {!!media && !!media.length && <Image src={media[0].url} />}
  </>
);

export default Paragraph;
