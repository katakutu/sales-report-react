const GlobalConfig = require('./../../GlobalConfig')
const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')
const session = require('./../../session')

const EMPTY_OBJECT = {}

function getUserID (context) {
  return Promise.resolve(5480482)
  // return getUserData(context)
  //   .then(ud => ud['user_id'] || 0)
  //   .catch(err => {
  //     console.error(`[GraphQL][Common][GetUserID] Failed to get User ID. Error: ${err}`)
  //
  //     return 0
  //   })
}

function getUserData (context) {
  const sessID = context.cookies[GlobalConfig['Cookie']['SessionID']] || 'lite-cookie-not-found'

  return session.getSessionAsync(sessID).then(sessData => {
    const data = sessData ? JSON.parse(sessData) : {}

    // Check for session availability since we store OAuth tokens in express.js
    // and logging out on perl will not remove express.js' session
    if (!data['access_token'] || !data['admin_id']) {
      return Promise.resolve(EMPTY_OBJECT)
    } else {
      // make sure we have the latest token taken from redis
      let token = data['access_token'] || ''
      let tType = 'Bearer'
      if (context && context.session && context.session.oauth) {
        token = data['access_token'] || context.session.oauth.token['access_token'] || ''
        tType = context.session.oauth.token['token_type'] || ''
      }

      // refresh token in case user has already logged out on
      // desktop and relogin with other account
      context.session.oauth = Object.assign(context.session.oauth || {}, {
        token: {
          'token_type': tType,
          'access_token': token
        }
      })

      const authConsumer = new TopedAuthAPI(token, tType)
      return authConsumer.getUserInfo()
        .then(user => {
          const userID = user['user_id']

          if (!userID) {
            const tokenMsg = `Token exists but no user for token ${token}.`
            const dataMsg = `Data returned from Accounts API: ${JSON.stringify(user)}`
            console.error(`[GraphQL][Common][UserInfo] Session error: ${tokenMsg} ${dataMsg}`)

            return Promise.resolve(EMPTY_OBJECT)
          }

          return user
        })
        .catch(err => {
          console.error(`[GraphQL][Common][UserInfo] Error: ${err}`)

          return EMPTY_OBJECT
        })
    }
  })
}

module.exports = {
  getUserID,
  getUserData
}
