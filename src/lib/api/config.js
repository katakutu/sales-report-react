const PRODUCTION = {
  Ace: {
    Hostname: 'ace-staging.tokopedia.com'
  },
  Mojito: {
    Hostname: 'mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws-staging.tokopedia.com'
  },
  Lite: {
    Hostname: 'lite-staging.tokopedia.com'
  },
  Saldo: {
    Hostname: 'http://192.168.16.110'
  }
}

const TEST = {
  Ace: {
    Hostname: 'ace-staging.tokopedia.com'
  },
  Mojito: {
    Hostname: 'mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws-staging.tokopedia.com'
  },
  Lite: {
    Hostname: 'lite-staging.tokopedia.com'
  },
  Saldo: {
    Hostname: 'https://saldoapp-staging.tokopedia.com'
  }
}

const DEVELOPMENT = {
  Ace: {
    Hostname: 'ace-alpha.tokopedia.com'
  },
  Mojito: {
    Hostname: 'mojito-alpha.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws-alpha.tokopedia.com'
  },
  Lite: {
    Hostname: 'lite-staging.tokopedia.com'
  },
  Saldo: {
    Hostname: 'https://saldoapp-staging.tokopedia.com'
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
