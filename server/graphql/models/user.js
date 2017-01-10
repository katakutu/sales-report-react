const GlobalConfig = require('./../../GlobalConfig')
const session = require('../../session')
const commons = require('./common')

const DEFAULT_NOT_LOGGED_IN = {
  'isLoggedIn': false,
  'shouldRedirect': false,
  'email': null,
  'name': null,
  'id': null,
  'profilePicture': null
}

const getDefaultLoginRedirect = (userID, shouldRedirect) => {
  return {
    'isLoggedIn': true,
    'shouldRedirect': shouldRedirect,
    'name': null,
    'email': null,
    'id': userID,
    'profilePicture': null
  }
}

function getUserInfo (context) {
  if (!context || !context.session || !context.session.oauth) {
    // break to two condition to pass linter (and better readability)
    if (context.cookies && context.cookies[GlobalConfig['Cookie']['SessionID']]) {
      // to prevent infinite loop we only force redirect to /login
      // if the callback URL is the same as hostname.
      // e.g. if we host on lite-staging.tokopedia.com and redir to m-staging.tokopedia.com
      //      this will be false so we won't get infinite redirection
      const shouldRedir = GlobalConfig['Accounts']['Callback'].indexOf(GlobalConfig['Hostname']) === 0
      return session.getSessionAsync(context.cookies[GlobalConfig['Cookie']['SessionID']])
        .timeout(5000)
        .then(sessData => {
          const sessionExists = sessData !== null
          const sessDataObj = sessData ? JSON.parse(sessData) : {}
          const loggedInSess = sessData && !isNaN(sessDataObj['admin_id'])
          const userID = loggedInSess ? sessDataObj['admin_id'] : null

          return getDefaultLoginRedirect(userID, shouldRedir && sessionExists && loggedInSess)
        })
        .catch(error => {
          console.log(`Get user info error: ${error.message}`)

          return DEFAULT_NOT_LOGGED_IN
        })
    } else {
      return Promise.resolve(DEFAULT_NOT_LOGGED_IN)
    }
  }

  return commons.getUserData(context)
    .then(user => {
      if (!user['user_id'] || !user['email']) {
        return DEFAULT_NOT_LOGGED_IN
      }

      return {
        'isLoggedIn': true,
        'shouldRedirect': false,
        'name': user['name'],
        'email': user['email'],
        'id': user['user_id'],
        'profilePicture': user['profile_picture']
      }
    })
    .catch(error => {
      console.error(`[GraphQL][Models][User] Error getting user data: ${error}`)

      return DEFAULT_NOT_LOGGED_IN
    })
}

module.exports = getUserInfo
