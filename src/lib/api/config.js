const PRODUCTION = {
  Ace: {
    Hostname: 'ace.tokopedia.com'
  },
  Mojito: {
    Hostname: 'mojito.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws.tokopedia.com'
  },
  Lite: {
    Hostname: 'lite.tokopedia.com'
  },
  Saldo: {
    Hostname: 'saldo.tokopedia.com'
  }
}

const BETA = {
  Ace: {
    Hostname: 'ace.tokopedia.com'
  },
  Mojito: {
    Hostname: 'mojito.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  WS: {
    Hostname: 'ws.tokopedia.com'
  },
  Lite: {
    Hostname: 'lite.tokopedia.com'
  },
  Saldo: {
    Hostname: 'saldo.tokopedia.com'
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
    Hostname: 'localhost:3000'
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
} else if (__BETA__) {
  config = BETA
}

export default config
