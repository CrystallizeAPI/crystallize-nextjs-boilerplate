import CrystallizeContent from '@crystallize/content-transformer/react';
import { H3 } from 'ui';

import { Outer, Title, Body } from './styles';
import Images from '../images';

const Paragraph = ({
  body,
  title,
  images,
  headingComponent: HeadingComponent = H3
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
      <Images images={images} />
    </Outer>
  );
};

export default Paragraph;
