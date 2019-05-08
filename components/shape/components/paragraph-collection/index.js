import PropTypes from 'prop-types';

import { Outer } from './styles';
import Paragraph from './paragraph';

const ParagraphCollection = ({ paragraphs }) => (
  <Outer>
    {paragraphs.map((paragraph, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Paragraph key={index} {...paragraph} />
    ))}
  </Outer>
);

ParagraphCollection.propTypes = {
  paragraphs: PropTypes.array.isRequired
};

export default ParagraphCollection;
