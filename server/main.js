const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const compress = require('compression')
const GlobalConfig = require('../GlobalConfig')

const app = express()
const paths = config.utils_paths

const oauthCredentials = {
  client: {
    id: GlobalConfig['Accounts']['ClientID'],
    secret: GlobalConfig['Accounts']['SecretKey']
  },
  auth : {
    tokenHost: GlobalConfig['Accounts']['Hostname'],
    tokenPath: GlobalConfig['Accounts']['TokenPath'],
    authorizePath: GlobalConfig['Accounts']['AuthorizePath']
  }
}

const oauth2 = require('simple-oauth2').create(oauthCredentials)
const oauthAuthorizationURI = oauth2.authorizationCode.authorizeURL({
  redirect_uri: GlobalConfig['Accounts']['Callback'],
  scope: '', state: '123asdf'
})

app.get('/login', (req, res) => {
  res.redirect(oauthAuthorizationURI)
})

app.get('/auth/callback', (req, res) => {
  const code = req.query.code
  const options = {code}

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message)
      return res.json('Authentication failed.')
    }

    console.log('Resulting token:', result)
    const token = oauth2.accessToken.create(result)

    return res.status(200).json(token)
  })
})

app.get('/login/success', (req, res) => {
  res.send('success!')
})


// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// Apply gzip compression
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))

  // serve the generated service-worker file
  app.get('/service-worker.js', (req, res) => {
    res.sendFile(paths.dist() + '/service-worker.js')
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

module.exports = app
