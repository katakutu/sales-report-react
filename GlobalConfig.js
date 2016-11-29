const config = require('./config')

const PRODUCTION = {
    Accounts: {
        Hostname: 'https://accounts.tokopedia.com',
        Callback: 'http://m.tokopedia.com/auth/callback'
    }
}

const TEST = {
    Accounts: {
        Hostname: 'https://accounts-alpha.tokopedia.com',
        Callback: 'http://lite-alpha.tokopedia.com/auth/callback'
    }
}

const DEVELOPMENT = {
    Accounts: {
        Hostname: 'https://accounts-alpha.tokopedia.com',
        Callback: 'http://lite-devel:3000/auth/callback'
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
