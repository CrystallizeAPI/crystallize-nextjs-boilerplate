# Crystallize React ecommerce frontend boilerplate

The bare minimum skeleton you need to get a frontend up and running on the [headless ecommerce](https://crystallize.com/product) & GraphQL based [product Information Management](https://crystallize.com/product/product-information-management) service [Crystallize](https://crystallize.com). [React commerce with Next.js SSR](https://crystallize.com/developers).

This frontend boilerplate is a great startingpoing when building [React ecommerce](https://crystallize.com/developers) experiences with [frontend performance](https://crystallize.com/blog/frontend-performance-measuring-kpis) in focus. You can have rich ecommerce content with the super structured [PIM](https://crystallize.com/product/product-information-management) engine in Crystallize powering your product catalogue.

Fast frontend performance delivers a better ecommerce experience and is a key ingredient in the [ecommerce SEO checklist](https://crystallize.com/blog/ecommerce-seo-checklist). [Rich content driven ecommerce experiences](https://crystallize.com/blog/content-rich-storytelling-makes-juicy-ecommerce) builds the foundation for a  [content strategy for exponential growth marketing](https://snowball.digital/blog/content-strategy-for-exponential-growth-marketing). 

Check it out, the boilerplate is Open Source and MIT licensed.

[![React: latest](https://img.shields.io/badge/react-latest-44cc11.svg?style=flat-square)](https://github.com/facebook/react)

[![Next: latest](https://img.shields.io/badge/next-latest-44cc11.svg?style=flat-square)](https://github.com/zeit/next.js)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![code linter: Eslint](https://img.shields.io/badge/code_linter-eslint-463fd4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Getting started

- Clone the repo or download from [the releases page](https://github.com/snowballdigital/crystallize-frontend-boilerplate/releases)
- Run `yarn` to install dependencies
- Run `yarn dev` to start up
- - The site should be ready at [http://localhost:3000](http://localhost:3000)
- (Optional) Install [Editor config](http://editorconfig.org/#download) and [Prettier](https://prettier.io/docs/en/editors.html) plugin for your editor

# App structure

## ./pages

Put all your entry pages here

## ./components

All your shared components

## ./ui

UI related components live her. Color variables and simple shared components

## ./server

This is where the ultra-light frontend server lives. Its primary function is to render the React app in response to a request

## ./lib

Library code to enable GraphQL and REST API communication and more

## ./static

Resources server statically by the web server. Including translation files

# Deploy

There are multiple alternatives for deployments, however for the easiest hosting of a Node application, one option is [Now](https://zeit.co/now).

## Deploying with Now

- Register a Now account
- Run `yarn global add now`
- Navigate to your project folder
- Run `now`
