/**
 * Preview catalogue items from Crystallize by setting a cookie
 * for the user session. Read more about the Next.JS preview mode:
 * https://nextjs.org/docs/advanced-features/preview-mode
 */

import { simplyFetchFromGraph } from 'lib/graph';
import { defaultLocale } from 'lib/app-config';

export default async function preview(req, res) {
  // Leave preview mode
  if ('leave' in req.query) {
    res.clearPreviewData();
    res.writeHead(307, {
      Location: req.query.leave ? decodeURIComponent(req.query.leave) : '/'
    });
    res.end();
    return;
  }

  /**
   * You should implement some kind of security check here to not
   * open the preview mode up to anybody
   */
  // if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  // Always allow preview for these paths
  const whitelistedPreviewPaths = ['/'];

  let redirectTo;
  const whitelistMatch = whitelistedPreviewPaths.find(
    (w) => w === req.query.slug
  );
  if (whitelistMatch) {
    redirectTo = whitelistMatch;
  } else {
    /**
     * If the path is not in the whitelist, we need to check
     * if it is a match in Crystallize
     */
    const {
      data: {
        catalogue: { path }
      }
    } = await simplyFetchFromGraph({
      query: `
        query ITEM_TYPE($language: String!, $path: String!) {
          catalogue(language: $language, path: $path) {
            path
          }
        }
      `,
      variables: {
        language:
          req.query.language || defaultLocale.crystallizeCatalogueLanguage,
        path: req.query.slug
      }
    });

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!path) {
      return res.status(401).json({ message: 'Invalid slug' });
    }

    redirectTo = path;
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
