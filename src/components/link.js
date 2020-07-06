/**
 * Locale aware link
 */

import { default as NextLink } from 'next/link';

import { useLocale } from 'lib/app-config';

export default function Link({ children, ...props }) {
  const locale = useLocale();

  if (!locale.urlPrefix) {
    return <NextLink {...props}>{children}</NextLink>;
  }

  const { href, as, ...restProps } = props;

  return (
    <NextLink
      href={`/[locale]${href === '/' ? '' : href}`}
      as={`/${locale.urlPrefix}/${as || href}`.replace(/\/{2,}/g, '/')}
      {...restProps}
    >
      {children}
    </NextLink>
  );
}
