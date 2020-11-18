import React, { useState } from 'react';
import { Image as Img } from '@crystallize/react-image';
import ContentTransformer from 'ui/content-transformer';
import { simplyFetchFromGraph } from 'lib/graph';
import { screen } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

import VariantSelector from './variant-selector';
import Buy from './buy';
import query from './query';
import Topics from 'components/topics';
import { useLocale } from 'lib/app-config';
import { useRouter } from 'next/router';

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
  const locale = useLocale();
  const router = useRouter();
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

  let schema = [];
  product.variants.map((variant) => {
    const { price, currency } =
      variant.priceVariants.find(
        (pv) => pv.identifier === locale.crystallizePriceVariant
      ) || {};
    schema = [
      ...schema,
      {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        sku: variant?.sku,
        name: variant?.name,
        description: summaryComponent?.content?.plainText?.[0],
        image: variant?.images?.[0]?.url,
        offers: {
          '@type': 'Offer',
          // priceValidUntil: 'YYYY-MM-DD',
          priceCurrency: currency,
          url: router?.asPath,
          availability:
            variant?.stock > 0
              ? `https://schema.org/InStock`
              : `https://schema.org/OutOfStock`,
          price,
          currency
        }
      }
    ];
  });
  return (
    <Layout title={product.name} preview={preview}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
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
