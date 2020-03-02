# Crystallize Frontend Boilerplate

[![React: latest][0]][1] [![Next: latest][2]][3] [![code style: prettier][4]][5]
[![code linter: Eslint][6]][7]

The bare minimum skeleton you need to get a frontend up and running on the
[headless ecommerce][8] & GraphQL based [product Information Management][9]
service [Crystallize][10]. [React commerce with Next.js SSR][11].

This frontend boilerplate is a great starting point when building [React
ecommerce][11] experiences with [frontend performance][12] in focus. You can
have rich ecommerce content with the super structured [PIM][13] engine in
Crystallize powering your product catalogue.

Fast frontend performance delivers a better ecommerce experience and is a key
ingredient in the [ecommerce SEO checklist][14]. [Rich content driven ecommerce
experiences][15] builds the foundation for a [content strategy for exponential
growth marketing][16].

Check it out, the boilerplate is Open Source and MIT licensed.

## Getting Started

You can use [Crystallize CLI][17] to bootstrap a project with this
`Next.js + React` boilerplate.

Simply run the following command (>= Node 8 required):

```sh
npx @crystallize/cli my-project
```

This will walk you through the steps of specifying your tenant, choosing the
template (Next.js + React) and adding additional features such as ZEIT Now.

Once your project has been created, you can simply navigate into your project's
directory and run the following to start up your development server:

```sh
npm run dev
# or
yarn dev
```

This will start up the server on http://localhost:3000 for development.

## App Structure

### `components/`

All your shared React components.

### `lib/`

Library code to enable GraphQL and REST API communication and more

### `page-components/`

We use the `page-components/` directory to hold the actual component content
related to entries in the `pages/` directory. This is because we store our
styled components in separate files to our default exported components, which
causes some conflict with the way Next.js handles files in the `pages/`
directory.

### `pages/`

Put all your entry pages here. These are interpreted as separate routes by
Next.js.

### `pages/api/`

All your ZEIT Now [serverless functions][18]. You can delete this folder if you
are not using ZEIT Now.

### `static/`

Static resources used by the web server.

### `ui/`

UI related components live here. Color variables and simple shared components

## Deploying Your Project

There are multiple alternatives for deployments, however for the easiest hosting
of a Node application, one option is [ZEIT Now][20].

### Deploying with ZEIT Now

- Register a ZEIT Now account
- Run `npm install --global now`
- Navigate to your project folder
- Run `now`

[0]: https://img.shields.io/badge/react-latest-44cc11.svg?style=flat-square
[1]: https://github.com/facebook/react
[2]: https://img.shields.io/badge/next-latest-44cc11.svg?style=flat-square
[3]: https://github.com/zeit/next.js
[4]:
  https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[5]: https://github.com/prettier/prettier
[6]:
  https://img.shields.io/badge/code_linter-eslint-463fd4.svg?style=flat-square
[7]: https://github.com/prettier/prettier
[8]: https://crystallize.com/product
[9]: https://crystallize.com/product/product-information-management
[10]: https://crystallize.com
[11]: https://crystallize.com/developers
[12]: https://crystallize.com/blog/frontend-performance-measuring-kpis
[13]: https://crystallize.com/product/product-information-management
[14]: https://crystallize.com/blog/ecommerce-seo-checklist
[15]:
  https://crystallize.com/blog/content-rich-storytelling-makes-juicy-ecommerce
[16]:
  https://snowball.digital/blog/content-strategy-for-exponential-growth-marketing
[17]: https://github.com/crystallizeapi/crystallize-cli
[18]: https://zeit.co/docs/v2/serverless-functions/introduction
[19]: https://zeit.co/guides/deploying-nextjs-with-now/
[20]: https://zeit.co/now
