import PropTypes from 'prop-types';

import { Paragraphs } from './styles';
import Paragraph from './paragraph';

const ParagraphCollection = ({ paragraphs }) => {
  if (!paragraphs) {
    return null;
  }

  return (
    <Paragraphs>
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index} {...paragraph} />
      ))}
    </Paragraphs>
  );
};

ParagraphCollection.propTypes = {
  paragraphs: PropTypes.array.isRequired
};

export default ParagraphCollection;
