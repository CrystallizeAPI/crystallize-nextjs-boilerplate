import React from 'react';
import PropTypes from 'prop-types';
import Chunk from '@crystallize/content-chunk/reactChunk';

import ParagraphCollection from './paragraph-collection';

const ShapeComponents = ({ components }) => {
  if (!components) {
    return null;
  }

  return (
    <div>
      {components.map((component, index) => {
        if (component.type === 'paragraphCollection') {
          return (
            <ParagraphCollection
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              paragraphs={component.content.paragraphs}
            />
          );
        }

        if (component.type === 'richText') {
          return (
            <Chunk
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...component.content.json[0]}
            />
          );
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>Render for {component.type} not implemented</div>
        );
      })}
    </div>
  );
};

ShapeComponents.propTypes = {
  components: PropTypes.array.isRequired
};

export default ShapeComponents;
