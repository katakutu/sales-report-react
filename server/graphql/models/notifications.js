const {
    TopedNotificationAPI,
    DEFAULT_NOTIFICATION_DATA
} = require('./../../api-consumer/api/Notification/TopedNotificationAPI')
const common = require('./common')

function getNotifications (context) {
  const userID = common.getUserID(context)

  // token is always newest after calling common.getUserID
  const token = context.session.oauth.token['access_token']
  const tType = context.session.oauth.token['token_type']

  const api = new TopedNotificationAPI(token, tType)

  return userID
        .then(uid => {
          return api.getNotification(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Notification] Error getting notification data: ${error}`)

          return Promise.resolve(DEFAULT_NOTIFICATION_DATA)
        })
}

module.exports = getNotifications
