import Chunk from '@crystallize/content-chunk/reactChunk';
import Image from '@crystallize/react-image';
import { H1, H2 } from 'ui';

const Collection = ({ body, title, media, h1 }) => (
  <>
    {!!title && h1 ? <H1>{title}</H1> : <H2>{title}</H2>}
    {!!body && <Chunk {...body} />}
    {!!media.length && <Image src={media[0].url} />}
  </>
);
export default Collection;
