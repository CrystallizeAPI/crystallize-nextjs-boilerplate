import PropTypes from 'prop-types';

import { Paragraphs } from './styles';
import Paragraph from './paragraph';

const ParagraphCollection = ({ paragraphs }) => {
  return (
    <Paragraphs>
      {paragraphs.map((paragraph, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Paragraph key={index} {...paragraph} />
      ))}
    </Paragraphs>
  );
};

ParagraphCollection.propTypes = {
  paragraphs: PropTypes.array.isRequired
};

export default ParagraphCollection;
