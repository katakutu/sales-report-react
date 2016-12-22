const GlobalConfig = require('./../../GlobalConfig')
const PromiseHelper = require('../../helpers/promise-helper')
const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')
const session = require('../../session')

const {
  DEFAULT_SALDO_DATA,
  TopedSaldoAPI
} = require('./../../api-consumer/api/Saldo/TopedSaldoAPI')

const {
  DEFAULT_NOTIFICATION_DATA,
  TopedNotificationAPI
} = require('./../../api-consumer/api/Notification/TopedNotificationAPI')

const {
  DEFAULT_POINTS_DATA,
  TopedPointsAPI
} = require('./../../api-consumer/api/Points/TopedPointsAPI')

const {
  DEFAULT_SHOP_DATA,
  TopedShopAPI
} = require('./../../api-consumer/api/Shop/TopedShopAPI')

const DEFAULT_NOT_LOGGED_IN = {
  'isLoggedIn': false,
  'shouldRedirect': false,
  'name': null,
  'id': null,
  'profilePicture': null,
  'deposit': DEFAULT_SALDO_DATA,
  'points': DEFAULT_POINTS_DATA,
  'notifications': DEFAULT_NOTIFICATION_DATA,
  'shop': DEFAULT_SHOP_DATA
}

const getDefaultLoginRedirect = (userID, shouldRedirect) => {
  return {
    'isLoggedIn': true,
    'shouldRedirect': shouldRedirect,
    'name': null,
    'id': userID,
    'profilePicture': null,
    'deposit': DEFAULT_SALDO_DATA,
    'points': DEFAULT_POINTS_DATA,
    'notifications': DEFAULT_NOTIFICATION_DATA,
    'shop': DEFAULT_SHOP_DATA
  }
}

function getUserInfo (context) {
  if (!context.session.oauth) {
    // break to two condition to pass linter (and better readability)
    if (context.cookies && context.cookies[GlobalConfig['Cookie']['SessionID']]) {
      // to prevent infinite loop we only force redirect to /login
      // if the callback URL is the same as hostname.
      // e.g. if we host on lite-staging.tokopedia.com and redir to m-staging.tokopedia.com
      //      this will be false so we won't get infinite redirection
      const shouldRedir = GlobalConfig['Accounts']['Callback'].indexOf(GlobalConfig['Hostname']) === 0
      return new Promise((resolve, reject) => {
        session.getSession(context.cookies[GlobalConfig['Cookie']['SessionID']], sessData => {
          const sessionExists = sessData !== null
          const sessDataObj = sessData ? JSON.parse(sessData) : {}
          const loggedInSess = sessData && !isNaN(sessDataObj['admin_id'])
          const userID = loggedInSess ? sessDataObj['admin_id'] : null

          resolve(getDefaultLoginRedirect(userID, shouldRedir && sessionExists && loggedInSess))
        })

        setTimeout(reject, 5000)
      })
    } else {
      return Promise.resolve(DEFAULT_NOT_LOGGED_IN)
    }
  }

  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'
  return new Promise((resolve, reject) => {
    session.getSession(sessID, sessData => {
      const data = sessData ? JSON.parse(sessData) : {}

      // Check for session availability since we store OAuth tokens in express.js
      // and logging out on perl will not remove express.js' session
      if (!data['access_token'] || !data['admin_id']) {
        return context.session.destroy(err => {
          if (err) {
            console.error(`Destroying session failed: ${err}`)
          }

          resolve(DEFAULT_NOT_LOGGED_IN)
        })
      } else {
        const tType = context.session.oauth.token['token_type']
        const token = context.session.oauth.token['access_token']

        const authConsumer = new TopedAuthAPI(token, tType)
        const saldoConsumer = new TopedSaldoAPI()
        const notifConsumer = new TopedNotificationAPI(token, tType)
        const pointConsumer = new TopedPointsAPI()
        const shopConsumer = new TopedShopAPI()

        authConsumer.getUserInfo().then(user => {
          const userID = user['user_id']
          let saldo = PromiseHelper.timeout(saldoConsumer.getDeposit(userID), 1000, 'Saldo API Call')
          let notif = PromiseHelper.timeout(notifConsumer.getNotification(userID), 1000, 'Notif API Call')
          let point = PromiseHelper.timeout(pointConsumer.getPoints(userID), 1000, 'Points API Call')
          let shop = PromiseHelper.timeout(shopConsumer.getShop(userID), 1000, 'Shop API Call')

          return Promise.all([saldo, notif, point, shop])
            .then(s => {
              resolve({
                'isLoggedIn': true,
                'shouldRedirect': false,
                'name': user['name'],
                'id': userID,
                'profilePicture': user['profile_picture'],
                'deposit': s[0] || DEFAULT_SALDO_DATA,
                'points': s[2] || DEFAULT_POINTS_DATA,
                'notifications': s[1] || DEFAULT_NOTIFICATION_DATA,
                'shop': s[3] || DEFAULT_SHOP_DATA
              })
            })
            .catch(e => {
              return resolve({
                'isLoggedIn': true,
                'shouldRedirect': false,
                'name': user['name'],
                'id': userID,
                'profilePicture': user['profile_picture'],
                'deposit': DEFAULT_SALDO_DATA,
                'points': DEFAULT_POINTS_DATA,
                'notifications': DEFAULT_NOTIFICATION_DATA,
                'shop': DEFAULT_SHOP_DATA
              })
            })
        })
      }
    })

    setTimeout(reject, 5000)
  })
}

module.exports = getUserInfo
