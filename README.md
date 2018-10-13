# Crystallize frontend boilerplate

The bare minimum skeleton you need to get a frontend up and running on [Crystallize](https://crystallize.com). React SSR with Next.js

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
