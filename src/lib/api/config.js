const PRODUCTION = {
  Mojito: {
    Hostname: 'mojito.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws.tokopedia.com'
  }
}

const TEST = {
  Mojito: {
    Hostname: 'mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws-staging.tokopedia.com'
  }
}

const DEVELOPMENT = {
  Mojito: {
    Hostname: 'mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws-staging.tokopedia.com'
  }
}

let config = DEVELOPMENT
if (__DEV__) {
  config = DEVELOPMENT
} else if (__TEST__) {
  config = TEST
} else if (__PROD__) {
  config = PRODUCTION
}

export default config
