'use strict'

const GlobalConfig = require('./GlobalConfig')
const randomstring = require('randomstring')
const session = require('./session')

const TopedAuthAPI = require('./api-consumer/api/Auth/TopedAuthAPI')
const { TopedSaldoAPI } = require('./api-consumer/api/Saldo/TopedSaldoAPI')
const { TopedNotificationAPI } = require('./api-consumer/api/Notification/TopedNotificationAPI')
const { TopedPointsAPI } = require('./api-consumer/api/Points/TopedPointsAPI')

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

      if (res.cookies && res.cookies[GlobalConfig['Cookie']['SessionID']]) {
        session.removeUserSession(res.cookies[GlobalConfig['Cookie']['SessionID']])
      }

      return res.redirect('/')
    })
  },
  redirect: function (req, res, next) {
    // already logged in
    if (req.session.oauth) {
      console.log(`User already logged in. Session: ${req.session.oauth}`)
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
          console.log('Access Token Error', error.message)
          return res.redirect('/')
        }

        const token = oauth2.accessToken.create(result)
        req.session.oauth = token

        // const sid = session.newSessionID()

        console.log(`user token: ${JSON.stringify(token)}`)

        const authConsumer = new TopedAuthAPI(token['token']['access_token'], token['token']['token_type'])
        authConsumer.getUserInfo().then(user => {
          const sid = req.cookies[GlobalConfig['Cookie']['SessionID']] || session.newSessionID()

          console.log(`Cookies data: ${req.cookies}`)
          console.log(`user data: ${JSON.stringify(user)}`)
          console.log(`Creating login session for user sid ${sid}`)
          session.createUserSessionBySID(user, token, sid, (_, reply, sessionData) => {
            const cookieOpt = {
              domain: GlobalConfig['Cookie']['Domain'],
              expires: GlobalConfig['Cookie']['MaxAge'],
              httpOnly: true,
              maxAge: GlobalConfig['Cookie']['MaxAge']
            }
            res.cookie(GlobalConfig['Cookie']['SessionID'], sid, cookieOpt)

            return res.redirect(`${GlobalConfig['Hostname']}/?view=feed_preview`)
          })
        })
      })
    }
  },
  userInfo: function (req, res, next) {
    if (!req.session.oauth) {
      // break to two condition to pass linter (and better readability)
      if (req.cookies && req.cookies[GlobalConfig['Cookie']['SessionID']]) {
        // to prevent infinite loop we only force redirect to /login
        // if the callback URL is the same as hostname.
        // e.g. if we host on lite-staging.tokopedia.com and redir to m-staging.tokopedia.com
        //      this will be false so we won't get infinite redirection
        const shouldRedir = GlobalConfig['Accounts']['Callback'].indexOf(GlobalConfig['Hostname']) === 0

        // temp for testing
        session.getSession(req.cookies[GlobalConfig['Cookie']['SessionID']], sessData => {
          const sessExists = sessData !== null
          console.log(`Session data: ${sessData}`)
          return res.status(200).json({ login_redirect: shouldRedir && sessExists })
        })
      } else {
        return res.status(200).json({ error: 'User is not logged in!' })
      }
    }

    const tType = req.session.oauth.token['token_type']
    const token = req.session.oauth.token['access_token']

    const authConsumer = new TopedAuthAPI(token, tType)
    const saldoConsumer = new TopedSaldoAPI()
    const notifConsumer = new TopedNotificationAPI(token, tType)
    const pointConsumer = new TopedPointsAPI()

    authConsumer.getUserInfo().then(user => {
      const userID = user['user_id']
      let saldo = saldoConsumer.getDeposit(userID)
      let notif = notifConsumer.getNotification(userID)
      let point = pointConsumer.getPoints(userID)

      Promise.all([saldo, notif, point]).then(s => {
        return res.json({
          'name': user['name'],
          'id': userID,
          'profilePicture': user['profile_picture'],
          'deposit': s[0]['deposit_fmt'] || 'Rp 0',
          'points': s[2]['data']['attributes']['amount_formatted'] || 'Rp 0',
          'notifications': s[1]['data']
        })
      })
    })
  }
}
