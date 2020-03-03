import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CrystallizeContent from '@crystallize/content-transformer/react';

import ParagraphCollection from './paragraph-collection';
import PropertiesTable from './properties-table';
import Images from './images';

const Outer = styled.div``;

const ContentOuter = styled.div`
  margin: 1em var(--content-padding);
`;

const ShapeComponents = ({ components, overrides }) => {
  if (!components || !Array.isArray(components)) {
    return null;
  }

  return (
    <Outer>
      {components
        .filter(component => component.content != null)
        .map(({ type, ...component }, index) => {
          const key = index;
          let Component;

          // Check for overrides
          if (overrides && overrides[component.name]) {
            Component = overrides[component.name];
          }

          if (type === 'paragraphCollection') {
            if (!component.content.paragraphs) {
              return null;
            }

            Component = Component || ParagraphCollection;

            return (
              <Component key={key} paragraphs={component.content.paragraphs} />
            );
          }

          if (type === 'images') {
            if (!component.content || !component.content.images) {
              return null;
            }
            return <Images key={key} images={component.content.images} />;
          }

          if (type === 'richText') {
            if (!component.content.json) {
              return null;
            }
            Component = Component || 'div';
            return (
              <ContentOuter key={key}>
                <Component>
                  <CrystallizeContent {...component.content.json} />
                </Component>
              </ContentOuter>
            );
          }

          if (type === 'singleLine') {
            Component = Component || 'div';
            return (
              <ContentOuter key={key}>
                <Component>{component.content.text}</Component>
              </ContentOuter>
            );
          }

          if (type === 'propertiesTable') {
            Component = Component || PropertiesTable;
            return (
              <ContentOuter key={key}>
                <Component {...component.content} />
              </ContentOuter>
            );
          }

          // eslint-disable-next-line no-console
          console.log(`Render for ${type} not implemented`);

          return <span key={key} />;
        })}
    </Outer>
  );
};

ShapeComponents.propTypes = {
  components: PropTypes.array.isRequired,
  overrides: PropTypes.object
};

export default ShapeComponents;
