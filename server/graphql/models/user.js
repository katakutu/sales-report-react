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

const getDefaultLoginRedirect = (userData, shouldRedirect) => {
  return {
    'isLoggedIn': true,
    'shouldRedirect': shouldRedirect,
    'name': userData.name || '',
    'email': userData.email || '',
    'id': userData.id || 0,
    'profilePicture': userData.profilePicture || ''
  }
}

function getUserInfo (context) {
  if (!context || !context.session || !context.session.oauth) {
    // break to two condition to pass linter (and better readability)
    const sid = context.cookies[GlobalConfig['Cookie']['SessionID']]
    if (context.cookies && sid) {
      // to prevent infinite loop we only force redirect to /login
      // if the callback URL is the same as hostname.
      // e.g. if we host on lite-staging.tokopedia.com and redir to m-staging.tokopedia.com
      //      this will be false so we won't get infinite redirection
      const shouldRedir = GlobalConfig['Accounts']['Callback'].indexOf(GlobalConfig['Hostname']) === 0
      return session.getSessionAsync(context.cookies[GlobalConfig['Cookie']['SessionID']])
        .timeout(5000)
        .then(sessData => {
          const sessionNotExists = sessData === null
          const sessDataObj = sessData ? JSON.parse(sessData) : {}
          const loggedInSess = sessData && !isNaN(sessDataObj['admin_id'])
          const userID = loggedInSess ? sessDataObj['admin_id'] : null

          const lF = context.cookies[GlobalConfig['Cookie']['LoginFlag']] || '0'
          const loggedInPulsa = lF === '1'

          const finalSR = (shouldRedir && sessionNotExists && loggedInSess) || loggedInPulsa

          if (userID) {
            const userData = {
              id: userID,
              name: sessData['name'],
              email: sessData['email'],
              profilePicture: sessData['profile_picture']
            }
            return getDefaultLoginRedirect(userData, finalSR)
          } else {
            return DEFAULT_NOT_LOGGED_IN
          }
        })
        .catch(error => {
          console.error(`Get user info error: ${error.message}`)

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
