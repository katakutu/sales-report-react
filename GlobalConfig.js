const config = require('./config')

const PRODUCTION = {
    Hostname: 'https://m.tokopedia.com',
    Accounts: {
        Hostname: 'https://accounts.tokopedia.com',
        Callback: 'https://m.tokopedia.com/appauth/code'
    },
    Saldo: {
        Hostname: 'http://192.168.16.110'
    },
    Notification: {
        Hostname: 'http://orderapp.tokopedia.local/'
    },
    Points: {
        Hostname: 'https://points.tokopedia.com',
        Secret: '4lclover'
    }
}

const TEST = {
    Hostname: 'https://m-staging.tokopedia.com',
    Accounts: {
        Hostname: 'https://accounts-staging.tokopedia.com',
        Callback: 'https://lite-staging.tokopedia.com/appauth/code'
    },
    Saldo: {
        Hostname: 'https://saldoapp-staging.tokopedia.com'
    },
    Notification: {
        Hostname: 'http://10.0.11.60'
    },
    Points: {
        Hostname: 'https://points-staging.tokopedia.com',
        Secret: '4lclover'
    }

}

const DEVELOPMENT = {
    Hostname: 'https://m-staging.tokopedia.com',
    Accounts: {
        Hostname: 'https://accounts-alpha.tokopedia.com',
        Callback: 'http://lite-devel:3000/appauth/code'
    },
    Saldo: {
        Hostname: 'https://saldoapp-staging.tokopedia.com'
    },
    Notification: {
        Hostname: 'http://172.16.20.88:9001' // contact vicky.sukarma @mattermost if it's down
    },
    Points: {
        Hostname: 'https://points-staging.tokopedia.com',
        Secret: '4lclover'
    }

}

let globalConfig = DEVELOPMENT
if (config.globals.__DEV__) {
  globalConfig = DEVELOPMENT
} else if (config.globals.__TEST__) {
  globalConfig = TEST
} else if (config.globals.__PROD__) {
  globalConfig = PRODUCTION
}

globalConfig['AppSecret'] = process.env.TOPED_LITE_APP_SECRET || 'no-secret'
globalConfig['Accounts']['ClientID'] = process.env.TOPED_LITE_CLIENT_ID || '0001'
globalConfig['Accounts']['SecretKey'] = process.env.TOPED_LITE_SECRET_KEY || 'no-secret'
globalConfig['Accounts']['AuthorizePath'] = '/authorize'
globalConfig['Accounts']['TokenPath'] = '/token'

module.exports = globalConfig
