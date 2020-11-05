import React, { useState } from 'react';
import Img from '@crystallize/react-image';
import ContentTransformer from 'ui/content-transformer';

import { simplyFetchFromGraph } from 'lib/graph';
import { screen } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import Topics from 'components/topics';

import {
  Outer,
  Sections,
  Media,
  MediaInner,
  Name,
  Info,
  Summary,
  Content,
  Specs,
  Description
} from './styles';

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });
  return { ...data, preview };
}

export default function ProductPage({ product, preview }) {
  // Set the selected variant to the default
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.isDefault)
  );

  function onVariantChange(variant) {
    setSelectedVariant(variant);
  }

  const summaryComponent = product.components?.find(
    (c) => c.name === 'Summary'
  );
  const descriptionComponent = product.components?.find(
    (c) => c.name === 'Description'
  );
  const specs = product.components?.find((c) => c.name === 'Specs');
  const componentsRest = product.components?.filter(
    (c) => !['Summary', 'Description', 'Specs'].includes(c.name)
  );

  return (
    <Layout title={product.name} preview={preview}>
      <Outer>
        <Sections>
          <Media>
            <MediaInner>
              <Img
                {...selectedVariant.images?.[0]}
                sizes={`(max-width: ${screen.sm}px) 400px, 60vw`}
                alt={product.name}
              />
            </MediaInner>
          </Media>
          <Info>
            <Name>{product.name}</Name>
            {summaryComponent && (
              <Summary>
                <ContentTransformer {...summaryComponent?.content?.json} />
              </Summary>
            )}

            {product.variants?.length > 1 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={onVariantChange}
              />
            )}

            <Buy product={product} selectedVariant={selectedVariant} />
          </Info>
        </Sections>
        <Content>
          {descriptionComponent && (
            <Description>
              <ShapeComponents
                className="description"
                components={[descriptionComponent]}
              />
            </Description>
          )}
          {specs && (
            <Specs>
              <ShapeComponents components={[specs]} />
            </Specs>
          )}
        </Content>

        {product?.topics?.length && <Topics topicMaps={product.topics} />}

        <ShapeComponents components={componentsRest} />
      </Outer>
    </Layout>
  );
}
