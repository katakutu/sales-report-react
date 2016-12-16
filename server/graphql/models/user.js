const GlobalConfig = require('./../../GlobalConfig')
const PromiseHelper = require('../../helpers/promise-helper')
const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')

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

const DEFAULT_NOT_LOGGED_IN = {
  'isLoggedIn': false,
  'shouldRedirect': false,
  'name': null,
  'id': null,
  'profilePicture': null,
  'deposit': DEFAULT_SALDO_DATA,
  'points': DEFAULT_POINTS_DATA,
  'notifications': DEFAULT_NOTIFICATION_DATA
}

const getDefaultLoginRedirect = (shouldRedirect) => {
  return {
    'isLoggedIn': true,
    'shouldRedirect': shouldRedirect,
    'name': null,
    'id': null,
    'profilePicture': null,
    'deposit': DEFAULT_SALDO_DATA,
    'points': DEFAULT_POINTS_DATA,
    'notifications': DEFAULT_NOTIFICATION_DATA
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

      return Promise.resolve(getDefaultLoginRedirect(shouldRedir))
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

  return authConsumer.getUserInfo().then(user => {
    const userID = user['user_id']
    let saldo = PromiseHelper.timeout(saldoConsumer.getDeposit(userID), 5000, 'Saldo API Call')
    let notif = PromiseHelper.timeout(notifConsumer.getNotification(userID), 5000, 'Notif API Call')
    let point = PromiseHelper.timeout(pointConsumer.getPoints(userID), 5000, 'Points API Call')

    return Promise.all([saldo, notif, point])
      .then(s => {
        console.log('Notif')
        console.log(s[1])
        return {
          'isLoggedIn': true,
          'shouldRedirect': false,
          'name': user['name'],
          'id': userID,
          'profilePicture': user['profile_picture'],
          'deposit': s[0] || DEFAULT_SALDO_DATA,
          'points': s[2] || DEFAULT_POINTS_DATA,
          'notifications': s[1] || DEFAULT_NOTIFICATION_DATA
        }
      })
      .catch(e => {
        console.error(e)
        return {
          'isLoggedIn': true,
          'shouldRedirect': false,
          'name': user['name'],
          'id': userID,
          'profilePicture': user['profile_picture'],
          'deposit': DEFAULT_SALDO_DATA,
          'points': DEFAULT_POINTS_DATA,
          'notifications': DEFAULT_NOTIFICATION_DATA
        }
      })
  })
}

module.exports = getUserInfo
