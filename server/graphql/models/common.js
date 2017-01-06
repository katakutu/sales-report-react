const TopedAuthAPI = require('./../../api-consumer/api/Auth/TopedAuthAPI')

function getUserID (context) {
  let userID = Promise.resolve(0)
  if (context && context.session && context.session.oauth) {
    const tType = context.session.oauth.token['token_type']
    const token = context.session.oauth.token['access_token']

    const authConsumer = new TopedAuthAPI(token, tType)
    userID = authConsumer.getUserInfo().then(user => user['user_id'])
  }

  return userID
}

module.exports = {
  getUserID
}
