import React, { useState } from 'react';
import Img from '@crystallize/react-image';
import CrystallizeContent from '@crystallize/content-transformer/react';
import isEqual from 'lodash/isEqual';

import { H1, H2, screen } from 'ui';
import CategoryItem from 'components/category-item';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';
import { attributesToObject } from 'lib/util/variants';
import { simplyFetchFromGraph } from 'lib/graph';

import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import {
  Outer,
  Sections,
  Media,
  MediaInner,
  Info,
  Summary,
  ShapeContent,
  Description,
  RelatedTopics,
  TopicMap,
  TopicTitle,
  List
} from './styles';

export async function getData({ asPath, language }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: { path: asPath, language }
  });
  return data;
}

export default function ProductPage({ product }) {
  // Set the selected variant to the default
  const [chosenVariant, setChosenVariant] = useState(
    product.variants.find(v => v.isDefault)
  );

  const onAttributeChange = (attributes, newAttribute) => {
    const newAttributes = attributesToObject(attributes);
    newAttributes[newAttribute.attribute] = newAttribute.value;

    const newSelectedVariant = product.variants.find(variant => {
      const variantAttributes = attributesToObject(variant.attributes);
      return isEqual(variantAttributes, newAttributes);
    });

    setChosenVariant(newSelectedVariant);
  };

  const onVariantChange = variant => setChosenVariant(variant);

  const summaryComponent = product.components.find(c => c.name === 'Summary');
  const descriptionComponent = product.components.find(
    c => c.name === 'Description'
  );
  const componentsRest = product.components.filter(
    c => !['Summary', 'Description'].includes(c.name)
  );

  return (
    <Layout title={product.name}>
      <Outer>
        <Sections>
          <Media>
            <MediaInner>
              <Img
                {...chosenVariant.image}
                sizes={`(max-width: ${screen.sm}px) 400px, 600px`}
                alt={product.name}
              />
            </MediaInner>
          </Media>
          <Info>
            <H1>{product.name}</H1>
            {summaryComponent && (
              <Summary>
                <CrystallizeContent {...summaryComponent?.content?.json} />
              </Summary>
            )}

            {product.variants.length > 1 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={chosenVariant}
                onVariantChange={onVariantChange}
                onAttributeChange={onAttributeChange}
              />
            )}

            <Buy product={product} selectedVariant={chosenVariant} />
          </Info>
        </Sections>

        {descriptionComponent && (
          <Description>
            <ShapeComponents
              className="description"
              components={[descriptionComponent]}
            />
          </Description>
        )}

        <ShapeContent>
          <ShapeComponents components={componentsRest} />
        </ShapeContent>

        {product.topics && !!product.topics.length && (
          <RelatedTopics>
            <H2>Related</H2>

            {product.topics.map(topic => (
              <TopicMap key={topic.name}>
                <TopicTitle>{topic.name}</TopicTitle>
                <List>
                  {topic.items.edges.map(({ node }) => (
                    <CategoryItem data={node} key={node.id} />
                  ))}
                </List>
              </TopicMap>
            ))}
          </RelatedTopics>
        )}
      </Outer>
    </Layout>
  );
}
