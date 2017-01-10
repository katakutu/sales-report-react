const {
    TopedNotificationAPI,
    DEFAULT_NOTIFICATION_DATA
} = require('./../../api-consumer/api/Notification/TopedNotificationAPI')
const common = require('./common')

function getNotifications (context) {
  const userID = common.getUserID(context)
  const api = new TopedNotificationAPI()

  return userID
        .then(uid => {
          return api.getNotifications(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Notification] Error getting notification data: ${error}`)

          return Promise.resolve(DEFAULT_NOTIFICATION_DATA)
        })
}

module.exports = getNotifications
