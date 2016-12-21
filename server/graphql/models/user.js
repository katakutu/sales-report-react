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
          const loggedInSess = sessData && !isNaN(sessData['admin_id'])
          const userID = loggedInSess ? sessData['admin_id'] : null
          console.log(`UID: ${userID}, ${loggedInSess}, ${sessData}`)
          resolve(getDefaultLoginRedirect(userID, shouldRedir && sessionExists && loggedInSess))
        })

        setTimeout(reject, 5000)
      })
    } else {
      return Promise.resolve(DEFAULT_NOT_LOGGED_IN)
    }
  }

  const tType = context.session.oauth.token['token_type']
  const token = context.session.oauth.token['access_token']

  const authConsumer = new TopedAuthAPI(token, tType)
  const saldoConsumer = new TopedSaldoAPI()
  const notifConsumer = new TopedNotificationAPI(token, tType)
  const pointConsumer = new TopedPointsAPI()
  const shopConsumer = new TopedShopAPI()

  return authConsumer.getUserInfo().then(user => {
    const userID = user['user_id']
    let saldo = PromiseHelper.timeout(saldoConsumer.getDeposit(userID), 5000, 'Saldo API Call')
    let notif = PromiseHelper.timeout(notifConsumer.getNotification(userID), 5000, 'Notif API Call')
    let point = PromiseHelper.timeout(pointConsumer.getPoints(userID), 5000, 'Points API Call')
    let shop = PromiseHelper.timeout(shopConsumer.getShop(userID), 5000, 'Shop API Call')

    return Promise.all([saldo, notif, point, shop])
      .then(s => {
        return {
          'isLoggedIn': true,
          'shouldRedirect': false,
          'name': user['name'],
          'id': userID,
          'profilePicture': user['profile_picture'],
          'deposit': s[0] || DEFAULT_SALDO_DATA,
          'points': s[2] || DEFAULT_POINTS_DATA,
          'notifications': s[1] || DEFAULT_NOTIFICATION_DATA,
          'shop': s[3] || DEFAULT_SHOP_DATA
        }
      })
      .catch(e => {
        return {
          'isLoggedIn': true,
          'shouldRedirect': false,
          'name': user['name'],
          'id': userID,
          'profilePicture': user['profile_picture'],
          'deposit': DEFAULT_SALDO_DATA,
          'points': DEFAULT_POINTS_DATA,
          'notifications': DEFAULT_NOTIFICATION_DATA,
          'shop': DEFAULT_SHOP_DATA
        }
      })
  })
}

module.exports = getUserInfo
