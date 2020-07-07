# Crystallize NextJS Boilerplate

[![Crystallize Community Slack][21]][22] [![React: latest][0]][1]
[![Next: latest][2]][3] [![code style: prettier][4]][5]
[![code linter: Eslint][6]][7]

The bare minimum skeleton you need to get a frontend up and running on the
[headless ecommerce][8] & GraphQL based [product Information Management][9]
service [Crystallize][10]. [React commerce with Next.js SSR][11].

This Next.js boilerplate is a great starting point when building [React
ecommerce][11] experiences with [frontend performance][12] in focus. You can
have rich ecommerce content with the super structured [PIM][13] engine in
Crystallize powering your product catalogue.

Fast frontend performance delivers a better ecommerce experience and is a key
ingredient in the [ecommerce SEO checklist][14]. [Rich content driven ecommerce
experiences][15] builds the foundation for a [content strategy for exponential
growth marketing][16].

Check it out, the boilerplate is Open Source and MIT licensed.

## Get a quick preview

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/CrystallizeAPI/crystallize-nextjs-boilerplate&env=CRYSTALLIZE_TENANT_IDENTIFIER&envDescription=Enter%20your%20own%20tenant%20identifier,%20or%20use%20the%20default:%20furniture)

## Getting Started

You can use [Crystallize CLI][17] to bootstrap a project with this
`Next.js + React` boilerplate.

Simply run the following command (>= Node 8 required):

```sh
npx @crystallize/cli my-project
```

This will walk you through the steps of specifying your tenant, choosing the
template (Next.js + React) and adding additional features such as Vercel.

Once your project has been created, you can simply navigate into your project's
directory and run the following to start up your development server:

```sh
npm run dev
# or
yarn dev
```

This will start up the server on http://localhost:3000 for development.

## App Structure

### `src/pages/`

Put all your entry pages here. These are interpreted as separate routes by
Next.js.

### `src/pages/api/`

All your Vercel [serverless functions][18].

### `src/page-components/`

We use the `page-components/` directory to hold the actual component content
related to entries in the `pages/` directory.

### `src/components/`

All your shared React components.

### `src/ui/`

UI related components live here. Color variables and simple shared components

### `src/lib/`

Enable GraphQL and REST API communication and more for the browser client

### `src/lib-api/`

Serverless API functions related code

### `public/static/`

Public resources hosted as static files

## Deploying Your Project

There are multiple alternatives for deployments, two of them being [Vercel][20]
and [Platform.sh][23]

### Deploying with Vercel

- Register a Vercel account
- Install vercel `yarn global add vercel` or `npm i -g vercel`
- Run `vercel`

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
[18]: https://vercel.com/docs/v2/serverless-functions/introduction
[19]: https://vercel.com/guides/deploying-nextjs-with-now/
[20]: https://vercel.com
[21]:
  https://img.shields.io/static/v1?label=Slack&logo=slack&message=Crystallize%20Community&color=68d1b7
[22]: https://slack.com
[23]: https://platform.sh
