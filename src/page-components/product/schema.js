import toText from '@crystallize/content-transformer/toText';
import { useRouter } from 'next/router';

const SchemaOrg = ({ variants, summary }) => {
  const router = useRouter();
  let schema = [];

  variants?.forEach((variant) => {
    const { price, currency } =
      variant.priceVariants.find((pv) => pv.identifier === 'default') || {};
    schema.push({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      sku: variant?.sku,
      name: variant?.name,
      description: toText(summary?.content?.json),
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
    });
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export default SchemaOrg;
