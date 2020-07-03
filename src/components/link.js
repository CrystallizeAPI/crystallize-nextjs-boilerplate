/**
 * Language aware link
 */

import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

export default function Link({ children, ...props }) {
  const router = useRouter();
  const { language } = router.query;

  if (!language) {
    return <NextLink {...props}>{children}</NextLink>;
  }

  const { href, as, ...restProps } = props;

  return (
    <NextLink
      href={`/[language]${href === '/' ? '' : href}`}
      as={`/${language}${as || href}`}
      {...restProps}
    >
      {children}
    </NextLink>
  );
}
