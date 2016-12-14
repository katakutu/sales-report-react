const GlobalConfig = require('./../../GlobalConfig')

const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')
const TopedSaldoAPI = require('./../../api-consumer/api/Saldo/TopedSaldoAPI')
const TopedNotificationAPI = require('./../../api-consumer/api/Notification/TopedNotificationAPI')
const TopedPointsAPI = require('./../../api-consumer/api/Points/TopedPointsAPI')

const DEFAULT_NOT_LOGGED_IN = {
  'isLoggedIn': false,
  'shouldRedirect': false,
  'name': null,
  'id': null,
  'profilePicture': null,
  'deposit': null,
  'points': null,
  'notifications': null
}

const getDefaultLoginRedirect = (shouldRedirect) => {
  return {
    'isLoggedIn': true,
    'shouldRedirect': shouldRedirect,
    'name': null,
    'id': null,
    'profilePicture': null,
    'deposit': null,
    'points': null,
    'notifications': null
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
    let saldo = saldoConsumer.getDeposit(userID)
    let notif = notifConsumer.getNotification(userID)
    let point = pointConsumer.getPoints(userID)

    return Promise.all([saldo, notif, point]).then(s => {
      return {
        'isLoggedIn': true,
        'shouldRedirect': false,
        'name': user['name'],
        'id': userID,
        'profilePicture': user['profile_picture'],
        'deposit': s[0]['deposit_fmt'] || 'Rp 0',
        'points': s[2]['data']['attributes']['amount_formatted'] || 'Rp 0',
        'notifications': s[1]['data']
      }
    })
  })
}

module.exports = getUserInfo
