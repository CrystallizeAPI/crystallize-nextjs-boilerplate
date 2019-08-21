import React from 'react';
import PropTypes from 'prop-types';
import Chunk from '@crystallize/content-chunk/reactChunk';

import ParagraphCollection from './paragraph-collection';

const ShapeComponents = ({ components }) => {
  if (!components) {
    return null;
  }

  return components
    .filter(component => component.content != null)
    .map(({ type, ...component }, index) => {
      const key = index;

      if (type === 'paragraphCollection') {
        return (
          <ParagraphCollection
            key={key}
            paragraphs={component.content.paragraphs}
          />
        );
      }

      if (type === 'richText') {
        return <Chunk key={key} {...component.content.json[0]} />;
      }

      if (type === 'singleLine') {
        return <span key={key}>{component.content.text}</span>;
      }

      // eslint-disable-next-line no-console
      console.log(`Render for ${type} not implemented`);

      return <span key={key} />;
    });
};

ShapeComponents.propTypes = {
  components: PropTypes.array.isRequired
};

export default ShapeComponents;
