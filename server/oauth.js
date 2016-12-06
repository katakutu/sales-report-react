'use strict'

const GlobalConfig = require('../GlobalConfig')
const randomstring = require('randomstring')

const oauthCredentials = {
  client: {
    id: GlobalConfig['Accounts']['ClientID'],
    secret: GlobalConfig['Accounts']['SecretKey']
  },
  auth : {
    tokenHost: GlobalConfig['Accounts']['Hostname'],
    tokenPath: GlobalConfig['Accounts']['TokenPath'],
    authorizePath: GlobalConfig['Accounts']['AuthorizePath']
  }
}

const oauth2 = require('simple-oauth2').create(oauthCredentials)
const oauthAuthorizationURI = (state) => {
  return oauth2.authorizationCode.authorizeURL({
    redirect_uri: GlobalConfig['Accounts']['Callback'],
    scope: '',
    state: state
  })
}

module.exports = {
  login: function (req, res, next) {
    const state = randomstring.generate()

    req.session.oauthState = state
    res.redirect(oauthAuthorizationURI(state))
  },
  logout: function (req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout failed', err)

        // TODO: Handle this case
        return res.redirect('/')
      }

      return res.redirect('/')
    })
  },
  redirect: function (req, res, next) {
      // already logged in
    if (req.session.oauth) {
      return res.redirect('/')
    }

    const code = req.query.code
    const options = { code }

      // make sure returned state is the same, to prevent CSRF
    if (req.session.oauthState !== req.query.state) {
          // TODO: error message / redirect to special page?
      return res.redirect('/')
    } else {
      oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
            // TODO: error message / redirect to special page?
          console.error('Access Token Error', error.message)
          return res.redirect('/')
        }

        const token = oauth2.accessToken.create(result)
        req.session.oauth = token

        return res.redirect('/')
      })
    }
  },
  userInfo: function (req, res, next) {
    if (!req.session.oauth) {
      return res.status(200).json({ error: 'User is not logged in!' })
    }

    const fetch = require('isomorphic-fetch')
    const hmac = require('./hmac')
    const tType = req.session.oauth.token['token_type']
    const token = req.session.oauth.token['access_token']
    const opt = { method: 'GET', headers: { 'Authorization': `${tType} ${token}` } }
    fetch(GlobalConfig['Accounts']['Hostname'] + '/info', opt).then(response => {
      response.json().then(user => {
        const saldoURL = GlobalConfig['Saldo']['Hostname'] +
          '/deposit/get/' +
          user['user_id'] +
          '?type=usable'
        let saldo = fetch(saldoURL, opt)
          .then(r => r.json())
          .catch(err => {
            console.error(`Failed to fetch ${saldoURL}. Returning default value. Error: `, err)
            return { deposit_fmt: 'Rp 0' }
          })

        const notifURL = GlobalConfig['Notification']['Hostname'] +
          '/v4/notification/get_notification.pl?user_id=' +
          user['user_id'] +
          '&bypass=true_true'
        let notif = fetch(notifURL, opt)
          .then(r => r.json())
          .catch(err => {
            console.error(`Failed to fetch ${notifURL}. Returning default value. Error: `, err)

            return {
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
          })

        const pointsReqTime = new Date()
        const pointsParams = 'shop_id=&user_id=' +
          user['user_id'] +
          '&ut=' + Math.floor(pointsReqTime.getTime() / 1000).toString()
        const pointsSig = hmac.generate(
          GlobalConfig['Points']['Secret'],
          'GET',
          '/v2',
          pointsReqTime,
          pointsParams,
          user['user_id'] + '~b',
          user['user_id']
        )
        const pointsURL = GlobalConfig['Points']['Hostname'] +
          '/v2?' + pointsParams +
          '&token=' + `Tokopedia Clover:${pointsSig}`
        let points = fetch(pointsURL, opt).then(r => {
          return r.json()
        }).catch(err => {
          console.error(`Failed to fetch ${pointsURL}. Returning default value. Error: `, err)

          return {
            data: {
              attributes: {
                amount_formatted: 'Rp 0'
              }
            }
          }
        })

        Promise.all([saldo, notif, points]).then(s => {
          return res.json({
            'name': user['name'],
            'id': user['user_id'],
            'profilePicture': user['profile_picture'],
            'deposit': s[0]['deposit_fmt'] || 'Rp 0',
            'points': s[2]['data']['attributes']['amount_formatted'] || 'Rp 0',
            'notifications': s[1]['data']
          })
        })
      })
    })
  }
}
