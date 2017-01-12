const config = require('../config')

const PRODUCTION = {
  DataDog: {
    Hostname: 'localhost'
  },
  Hostname: 'https://m.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_'
  },
  Ace: {
    Hostname: 'http://ace.tokopedia.com'
  },
  Accounts: {
    Hostname: 'https://accounts.tokopedia.com',
    HostnameLocal: 'http://accounts.tokopedia.local',
    Callback: 'https://m.tokopedia.com/appauth/code'
  },
  Hades: {
    'Hostname': 'http://hades.tokopedia.local'
  },
  Hotlist: {
    Hostname: 'http://localhost/ajax/hotlist.pl'
  },
  Lite: {
    Hostname: 'https://m.tokopedia.com'
  },
  Saldo: {
    Hostname: 'http://saldo.tokopedia.local'
  },
  Mojito: {
    Hostname: 'http://mojito.tokopedia.local',
    OfficialStoreHostname: 'http://mojito-os.tokopedia.local',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://orderapp.tokopedia.local/'
  },
  Points: {
    Hostname: 'http://points.tokopedia.local',
    Secret: '4lclover'
  },
  LoginDataRedis: {
    host: 'twemproxy.redis.db.tokopedia.local',
    port: '6380'
  },
  SessionRedis: {
    host: '192.168.17.190',
    port: 6379,
    // twemproxy: true,
    no_ready_check: true
  },
  WS: {
    Hostname: 'http://ws.tokopedia.local'
  },
  Tome: {
    Hostname: 'http://tome.tokopedia.local'
  }
}

const BETA = {
  DataDog: {
    Hostname: 'datadog.tokopedia.local'
  },
  Hostname: 'https://m-beta.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_'
  },
  Ace: {
    Hostname: 'https://ace.tokopedia.com'
  },
  Accounts: {
    Hostname: 'https://accounts.tokopedia.com',
    HostnameLocal: 'https://accounts.tokopedia.com',
    Callback: 'https://m-beta.tokopedia.com/appauth/code'
  },
  Hades: {
    'Hostname': 'https://hades.tokopedia.com'
  },
  Hotlist: {
    Hostname: 'https://m.tokopedia.com/ajax/hotlist.pl'
  },
  Lite: {
    Hostname: 'https://m-beta.tokopedia.com'
  },
  Saldo: {
    Hostname: 'http://192.168.16.110'
  },
  Mojito: {
    Hostname: 'https://mojito.tokopedia.com',
    OfficialStoreHostname: 'https://mojito.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://orderapp.tokopedia.local/'
  },
  Points: {
    Hostname: 'https://points.tokopedia.com',
    Secret: '4lclover'
  },
  LoginDataRedis: {
    host: 'twemproxy.redis.db.tokopedia.local',
    port: '6380'
  },
  SessionRedis: {
    host: '127.0.0.1',
    port: 6379,
    no_ready_check: true
  },
  WS: {
    Hostname: 'https://ws.tokopedia.com'
  },
  Tome: {
    Hostname: 'https://tome.tokopedia.com'
  }
}

const TEST = {
  DataDog: {
    Hostname: 'datadog.tokopedia.local'
  },
  Hostname: 'https://m-staging.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_Coba_'
  },
  Ace: {
    Hostname: 'https://ace-staging.tokopedia.com'
  },
  Accounts: {
    Hostname: 'https://accounts-staging.tokopedia.com',
    HostnameLocal: 'https://accounts-staging.tokopedia.com',
    Callback: 'https://m-staging.tokopedia.com/appauth/code'
  },
  Hades: {
    'Hostname': 'https://hades-staging.tokopedia.com'
  },
  Hotlist: {
    Hostname: 'https://m-staging.tokopedia.com/ajax/hotlist.pl'
  },
  Lite: {
    Hostname: 'https://m-staging.tokopedia.com'
  },
  Saldo: {
    Hostname: 'https://saldoapp-staging.tokopedia.com'
  },
  Mojito: {
    Hostname: 'http://127.0.0.1/mojito',
    OfficialStoreHostname: 'http://127.0.0.1/mojito',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://10.0.11.60'
  },
  Points: {
    Hostname: 'https://points-staging.tokopedia.com',
    Secret: '4lclover'
  },
  LoginDataRedis: {
    host: '10.0.11.50',
    port: 6381
  },
  SessionRedis: {
    host: '127.0.0.1',
    port: 6379
  },
  WS: {
    Hostname: 'https://ws-staging.tokopedia.com'
  },
  Tome: {
    Hostname: 'https://tome-staging.tokopedia.com'
  }
}

const DEVELOPMENT = {
  DataDog: {
    Hostname: 'localhost'
  },
  Hostname: 'https://m-staging.tokopedia.com',
  Cookie: {
    SessionID: '_SID_Tokopedia_'
  },
  Ace: {
    Hostname: 'https://ace-staging.tokopedia.com'
  },
  Accounts: {
    Hostname: 'http://192.168.100.160:8009',
    HostnameLocal: 'http://192.168.100.160:8009',
    Callback: 'http://localhost:3000/appauth/code'
  },
  Hades: {
    'Hostname': 'https://hades-staging.tokopedia.com'
  },
  Hotlist: {
    Hostname: 'https://m-staging.tokopedia.com/ajax/hotlist.pl'
  },
  Lite: {
    Hostname: 'http://localhost:3000'
  },
  Saldo: {
    Hostname: '192.168.100.160:9093'
  },
  Mojito: {
    Hostname: 'https://mojito-staging.tokopedia.com',
    OfficialStoreHostname: 'https://mojito-staging.tokopedia.com',
    SecretKey: 'mojito_api_v1'
  },
  Notification: {
    Hostname: 'http://172.16.20.88:9000' // contact vicky.sukarma @mattermost if it's down
  },
  Points: {
    Hostname: 'http://192.168.100.160:8005',
    Secret: '4lclover'
  },
  LoginDataRedis: {
    host: '127.0.0.1',
    port: 6379
  },
  SessionRedis: {
    host: '127.0.0.1',
    port: 6379,
    no_ready_check: true
  },
  WS: {
    Hostname: 'https://ws-staging.tokopedia.com'
  },
  Tome: {
    Hostname: 'https://tome-staging.tokopedia.com'
  }
}

let globalConfig = DEVELOPMENT
if (config.globals.__DEV__) {
  globalConfig = DEVELOPMENT
} else if (config.globals.__TEST__) {
  globalConfig = TEST
} else if (config.globals.__PROD__) {
  globalConfig = PRODUCTION
} else if (config.globals.__BETA__) {
  globalConfig = BETA
}

globalConfig['AppSecret'] = process.env.TOPED_LITE_APP_SECRET || 'no-secret'
globalConfig['Accounts']['ClientID'] = process.env.TOPED_LITE_CLIENT_ID || '0001'
globalConfig['Accounts']['SecretKey'] = process.env.TOPED_LITE_SECRET_KEY || 'no-secret'
globalConfig['Accounts']['AuthorizePath'] = '/authorize'
globalConfig['Accounts']['TokenPath'] = '/token'
globalConfig['Cookie']['Domain'] = '.tokopedia.com'
globalConfig['Cookie']['MaxAge'] = 259200

module.exports = globalConfig
