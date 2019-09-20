import PropTypes from 'prop-types';

import { Paragraphs } from './styles';
import Paragraph from './paragraph';

const ParagraphCollection = ({ paragraphs, paragraphOverrides }) => {
  return (
    <Paragraphs>
      {paragraphs.map((paragraph, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Paragraph key={index} {...paragraph} {...paragraphOverrides} />
      ))}
    </Paragraphs>
  );
};

ParagraphCollection.propTypes = {
  paragraphs: PropTypes.array.isRequired,
  paragraphOverrides: PropTypes.array
};

export default ParagraphCollection;
