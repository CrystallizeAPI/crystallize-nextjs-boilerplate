import Chunk from '@crystallize/content-chunk/reactChunk';
import Image from '@crystallize/react-image';
import { H1, H2 } from 'ui';

const Collection = ({ body, title, media, h1 }) => (
  <>
    {!!title && h1 ? <H1>{title.text}</H1> : <H2>{title.text}</H2>}
    {!!body && body.json && body.json.length > 0 && <Chunk {...body.json[0]} />}
    {!!media && !!media.length && <Image src={media[0].url} />}
  </>
);
export default Collection;
