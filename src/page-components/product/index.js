import React from 'react';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';
import { useLocale } from 'lib/app-config';
import SchemaOrg from './schema';
import ProductShape, { getData as getProductData } from 'shapes/product/page';

export const getData = getProductData;

export default function ProductPage({ product, preview }) {
  const locale = useLocale();
  const { name, components = [], variants = [] } = product;

  // As default, each variant shares URL
  // that's why we use the default variant for the og:attributes
  const defaultVariant = variants.find((variant) => variant.isDefault);
  const summaryComponent = components.find(({ name }) => name === 'Summary');

  return (
    <Layout
      title={name}
      image={defaultVariant.images?.[0]?.url}
      description={toText(summaryComponent?.content?.json)}
      preview={preview}
    >
      <SchemaOrg {...product} summary={summaryComponent} />
      <ProductShape product={product} locale={locale} />
    </Layout>
  );
}
