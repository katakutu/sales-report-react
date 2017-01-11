const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const compress = require('compression')
const oauth = require('./oauth')
const GlobalConfig = require('./GlobalConfig')
const session = require('express-session')
const morgan = require('morgan')
const graphql = require('./graphql')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const app = express()
const paths = config.utils_paths

const StatsD = require('node-dogstatsd').StatsD
const dogStatsD = new StatsD(GlobalConfig['DataDog']['Hostname'])

const ConnectDataDog = require('connect-datadog')({
  dogstats: dogStatsD,
  'response_code':true,
  'tags': ['tkpd:tokopedia-lite']
})

const sessionConfig = {
  store: new RedisStore(GlobalConfig.SessionRedis),
  secret: GlobalConfig['AppSecret'],
  resave: false,
  saveUninitialized: true,
  name: 'tLiteSession',
  cookie: {}
}
if (config.globals.__PROD__ || config.globals.__BETA__) {
  app.set('trust proxy', 1)
  // sessionConfig.cookie.secure = true
}

if (!config.globals.__PROD__) {
  app.use(morgan('combined'))
}
app.use(session(sessionConfig))
// cookie-parser's and express-session's secret must be the same
app.use(cookieParser(GlobalConfig['AppSecret']))

// datadog before router
app.use(ConnectDataDog)

app.use('/graphql', graphql)

app.get('/status', (req, res) => res.end('ok'))
app.get('/login', oauth.login)
app.get('/logout', oauth.logout)
app.get('/appauth/code', oauth.redirect)

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
  app.use(express.static(paths.public()))
}

module.exports = app
