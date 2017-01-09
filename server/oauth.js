'use strict'

const GlobalConfig = require('./GlobalConfig')
const randomstring = require('randomstring')
const session = require('./session')

const TopedAuthAPI = require('./api-consumer/api/Auth/TopedAuthAPI')

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
    req.session.beforeLogin = req.headers.referer

    res.redirect(oauthAuthorizationURI(state) + '&theme=mobile')
  },
  logout: function (req, res, next) {
    const redir = req.headers.referer || '/'
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout failed', err)

        // TODO: Handle this case
        return res.redirect(redir)
      }

      if (req.cookies && req.cookies[GlobalConfig['Cookie']['SessionID']]) {
        const sessID = req.cookies[GlobalConfig['Cookie']['SessionID']]
        return session.removeUserSession(sessID, success => {
          res.clearCookie(GlobalConfig['Cookie']['SessionID'])

          // Todo: flash to message user that logout is successful?
          return res.redirect(GlobalConfig['Accounts']['Hostname'] + '/logout')
        })
      }

      return res.redirect(redir)
    })
  },
  redirect: function (req, res, next) {
    // already logged in
    if (req.session.oauth) {
      const sess = req.cookies && req.cookies[GlobalConfig['Cookie']['SessionID']] || 'unknown'
      console.log(`User already logged in. Session: ${sess}`)
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

        const accessToken = token['token']['access_token']
        const authConsumer = new TopedAuthAPI(accessToken, token['token']['token_type'])
        authConsumer.getUserInfo()
          .then(user => {
            const sid = req.cookies[GlobalConfig['Cookie']['SessionID']] || session.newSessionID()

            return session.createUserSessionBySID(user, accessToken, sid, (_, reply, sessionData) => {
              const cookieOpt = {
                domain: GlobalConfig['Cookie']['Domain'],
                expires: GlobalConfig['Cookie']['MaxAge'],
                httpOnly: true,
                maxAge: GlobalConfig['Cookie']['MaxAge']
              }
              res.cookie(GlobalConfig['Cookie']['SessionID'], sid, cookieOpt)

              const redir = req.session.beforeLogin || `${GlobalConfig['Hostname']}/?view=feed_preview`
              if (req.session.beforeLogin) {
                req.session.beforeLogin = undefined
              }

              return res.redirect(redir)
            })
          })
          .catch(error => {
            console.log(`Get User Info Error: ${error.message}`)

            return res.redirect(`${GlobalConfig['Hostname']}/`)
          })
      })
    }
  }
}
