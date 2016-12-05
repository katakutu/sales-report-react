# Tokopedia Lite [![CircleCI](https://circleci.com/gh/tokopedia/tokopedia-lite.svg?style=svg&circle-token=05c5abc0c27359d9fe7818232eed45d8dcc1fefa)](https://circleci.com/gh/tokopedia/tokopedia-lite)

Tokopedia progressive mobile web app

## Table of Contents
1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Application Structure](#application-structure)

## Requirements
* node `^4.5.0`
* npm `^3.0.0`

## Requirements (dev machine)

* Hostname set to `lite-devel`. 
  This is for the authentication system, for which the callback is in `lite-devel:3000/appauth/code`.
  For development, make sure you can access your app via http://lite-devel:3000/ in browser.

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), 
you can start the site by running these commands:

```bash
$ npm install                   # Install project dependencies
$ export TOPED_LITE_APP_SECRET=<YOUR_APP_SECRET>
$ export TOPED_LITE_CLIENT_ID=<YOUR_CLIENT_ID>
$ export TOPED_LITE_SECRET_KEY=<YOUR_SECRET_KEY>
$ npm start                     # Compile and launch
```

Don't forget to get your `TOPED_LITE_APP_SECRET`, `TOPED_LITE_CLIENT_ID`, and `TOPED_LITE_SECRET_KEY` 
right. If you want to, you could also setup this on your `bashrc`.

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
| `start` |Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
|`flow:check`|Run [flow](https://flowtype.org/) type checker.|

***Important note:***

Before you commit, make sure to always run:

```bash
$ npm run test
$ npm run lint:fix
$ npm run lint:css
$ npm run flow:check
```

and have all the tests pass.
