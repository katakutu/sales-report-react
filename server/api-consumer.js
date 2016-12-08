import fetch from 'isomorphic-fetch'
import hmac from './hmac'
import GlobalConfig from '../GlobalConfig'

const DEFAULT_NOTIFICATION_DATA = {
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
const DEFAULT_POINTS_DATA = {
  data: {
    attributes: {
      amount_formatted: 'Rp 0'
    }
  }
}
const DEFAULT_SALDO_DATA = { deposit_fmt: 'Rp 0' }

function _getUserInfo (oauthTokenType, oauthToken) {
  const opt = {
    method: 'GET',
    headers: {
      'Authorization': `${oauthTokenType} ${oauthToken}`
    }
  }

  const hostname = GlobalConfig['Accounts']['Hostname']
  return fetch(`${hostname}/info`, opt)
        .then(response => response.json())
}

function _getUserNotification (userID, oauthTokenType, oauthToken) {
  const opt = {
    method: 'GET',
    headers: {
      'Authorization': `${oauthTokenType} ${oauthToken}`
    }
  }

  const hostname = GlobalConfig['Notification']['Hostname']
  const notifURL = `${hostname}/v4/notification/get_notification.pl?user_id=${userID}&bypass=true_true`

  return fetch(notifURL, opt)
        .then(r => r.json())
        .catch(err => {
          console.error(`Failed to fetch ${notifURL}. Returning default value. Error: `, err)
          return DEFAULT_NOTIFICATION_DATA
        })
}

function _getUserPoints (userID) {
  const pointsReqTime = new Date()
  const prtUnix = Math.floor(pointsReqTime.getTime() / 1000).toString()
  const pointsParams = `shop_id=&user_id=${userID}&ut=${prtUnix}`
  const pointsSig = hmac.generate(
        GlobalConfig['Points']['Secret'],
        'GET',
        '/v2',
        pointsReqTime,
        pointsParams,
        userID + '~b',
        userID
    )
  const token = `Tokopedia Clover:${pointsSig}`
  const hostname = GlobalConfig['Points']['Hostname']
  const pointsURL = `${hostname}/v2?${pointsParams}&token=${token}`

  return fetch(pointsURL, { method: 'GET' })
        .then(r => r.json())
        .catch(err => {
          console.error(`Failed to fetch ${pointsURL}. Returning default value. Error: `, err)

          return DEFAULT_POINTS_DATA
        })
}

function _getUserSaldo (userID, oauthTokenType, oauthToken) {
  const opt = {
    method: 'GET',
    headers: {
      'Authorization': `${oauthTokenType} ${oauthToken}`
    }
  }

  const hostname = GlobalConfig['Saldo']['Hostname']
  const saldoURL = `${hostname}/deposit/get/${userID}?type=usable`

  return fetch(saldoURL, opt)
        .then(r => r.json())
        .catch(err => {
          console.error(`Failed to fetch ${saldoURL}. Returning default value. Error: `, err)
          return DEFAULT_SALDO_DATA
        })
}

export default {
  getUserInfo: _getUserInfo,
  getUserNotification: _getUserNotification,
  getUserPoints: _getUserPoints,
  getUserSaldo: _getUserSaldo
}
