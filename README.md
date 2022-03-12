# Crystallize NextJS Boilerplate

----

This repository is what we call a "subtree split": a read-only copy of one directory of the main repository. 

If you want to report or contribute, you should do it on the main repository: https://github.com/CrystallizeAPI/boilerplates

----

[![Crystallize Community Slack][21]][22] [![React: latest][0]][1]
[![Next: latest][2]][3] [![code style: prettier][4]][5]
[![code linter: Eslint][6]][7]

A fully-working ecommerce storefront boilerplate built with NextJS that runs on
the [headless ecommerce][8] & GraphQL based [product Information Management][9]
service [Crystallize][10]. **Clone, run it up and sell!**

_⚠️ We also have some other [open-source ecommerce storefronts][11] that could
be of your interest._

## See a LIVE demo

Enjoy our [demo furniture site][24].

![Website that sell plants displaying them as a grid. Ecommerce created with the Crystallize NextJS boilerplate and powered by our GraphQL API](https://i.imgur.com/v3tGgyZ.png)

## Introduction

This Next.js boilerplate is a great starting point when building [React
ecommerce][11] experiences that **create wonderful user experiences because we
focus on [frontend performance][12]**.

Build **a rich ecommerce that stands out from the others with our super
structured [PIM][13] engine** (_Product Information Management_) in Crystallize
powering your product catalogue.

[Site speed](https://crystallize.com/learn/best-practices/frontend-performance/site-speed)
is an important component of the
[SEO checklist](https://crystallize.com/learn/best-practices/seo/seo-checklist).
[Measuring core web vitals](https://crystallize.com/learn/best-practices/frontend-performance/core-web-vitals)
is important to make sure you rank higher in search engines and also improves
your conversion rate. You sell attract more customers and sell more.

Build content rich eCommerce experiences. Freedom in
[content modeling](https://crystallize.com/learn/best-practices/information-architecture/content-modeling)
builds the foundation for an successful content strategy.

## Get Started Immediately

To get started, you can either watch the [livestream where we create an
ecommerce from zero to production explaining all the steps][26] or follow the
instructions below 👇.

Use the [Crystallize CLI][17] to bootstrap a project in 4 simple guied steps.

Simply run the following command (>= Node 8 required):

```sh
npx @crystallize/cli my-project
```

**This will walk you through the steps:**

1. Choose the tech stack you want

   > To get this storefront, select: Next.js - Complete ecommerce

2. Specify your tenant (the name of your project)

   > At this point, you can select our demo tenant (furniture) or use your own.
   > If you choose your own, you will have to create the content on our [Product
   > Information Management][9]

3. Select if you want to support multiple languages

4. Select the service API
   > At this point, you can select between our demo Service API or your own
   > service API tenant.
   >
   > A [Service API is an open-source project that acts as backend for any of
   > our open-source storefronts][25] that currently hndles the basket, the
   > checkout, the authentication, webhooks, etc. You can modify and/or extended
   > it as you like. Deploy it to Vercel, Amazon Web Services, etc. (we're
   > adding new provieders)
   >
   > Take into account that if you've selected your own tenant, you need to have
   > your own service API because our demo Service API doesn't support products
   > with different shape/attributes.
   >
   > To have your own Service API, you'll need to execute again, our CLI and
   > select the option "Service API - Backend for any of the frontends"

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

### `src/shapes/`

All your related stuff to shapes. Components, styles, graphql queries and more.

### `src/ui/`

UI related components live here. Color variables and simple shared components

### `src/lib/`

Enable GraphQL and REST API communication and more for the browser client

### `public/static/`

Public resources hosted as static files

## Deploying Your Project

There are multiple alternatives for deployments, two of them being [Vercel][20]
and [Platform.sh][23]

### Deploying with Vercel

- Register a Vercel account
- Install vercel `yarn global add vercel` or `npm i -g vercel`
- Run `vercel`

## License

Open-source and MIT license.

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
[8]: https://crystallize.com/ecommerce
[9]: https://crystallize.com/ecommerce/pim
[10]: https://crystallize.com
[11]: https://crystallize.com/developers
[12]: https://crystallize.com/blog/frontend-performance-measuring-kpis
[13]: https://crystallize.com/ecommerce/pim
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
[24]: https://furniture.superfast.shop/
[25]: https://github.com/CrystallizeAPI/service-api-boilerplate/
[26]: https://crystallize.com/learn/open-source/boilerplates/react-nextjs
