const TopedAPI = require('../TopedAPI')
const GlobalConfig = require('../../../GlobalConfig')
const URL = require('url')

const HOSTNAME = GlobalConfig['Notification']['Hostname']
const NOTIFICATION_SERVICE = {
  GetNotification: `${HOSTNAME}/v4/notification/get_notification.pl`
}

const DEFAULT_NOTIFICATION_DATA = {
  status: 'FAIL',
  data: {
    'sales': {
      'sales_new_order': 0,
      'sales_shipping_status': 0,
      'sales_shipping_confirm': 0
    },
    'inbox': {
      'inbox_talk': 0,
      'inbox_ticket': 0,
      'inbox_review': 0,
      'inbox_friend': 0,
      'inbox_wishlist': 0,
      'inbox_message': 0,
      'inbox_reputation': 0
    },
    'purchase': {
      'purchase_reorder': 0,
      'purchase_payment_conf': 0,
      'purchase_payment_confirm': 0,
      'purchase_order_status': 0,
      'purchase_delivery_confirm': 0
    },
    'total_notif': 0,
    'total_cart': 0,
    'incr_notif': null,
    'resolution': 0
  }
}

class TopedNotificationAPI {
  constructor (oauthToken, oauthTokenType) {
    this.api = new TopedAPI()
    this.token = oauthToken
    this.tokenType = oauthTokenType
  }

  getNotification (userID) {
    let url = URL.parse(NOTIFICATION_SERVICE.GetNotification.replace(':user_id', userID))
    let content = {
      'user_id': userID,
      'bypass': 'true_true'
    }
    return this.api.consumeOAuth(url, 'GET', this.token, this.tokenType, content, true)
        .catch(err => {
          console.error(`Failed to fetch ${url.format()}. Returning default value. Error: `, err)
          return DEFAULT_NOTIFICATION_DATA
        })
  }
}

module.exports = {
  DEFAULT_NOTIFICATION_DATA: DEFAULT_NOTIFICATION_DATA,
  TopedNotificationAPI: TopedNotificationAPI
}
