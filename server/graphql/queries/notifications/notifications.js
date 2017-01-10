const NotificationType = require('../../types/notification')
const getNotifications = require('../../models/notifications')

const NotificationQuery = {
  type: NotificationType,
  args: {},
  resolve: function (_, args, context) {
    return getNotifications(context)
  }
}

module.exports = NotificationQuery
