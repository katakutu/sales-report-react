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
      return res.status(403).json({ error: 'User is not logged in!' })
    }

    const fetch = require('isomorphic-fetch')
    const tType = req.session.oauth.token['token_type']
    const token = req.session.oauth.token['access_token']
    const opt = { method: 'GET', headers: { 'Authorization': `${tType} ${token}` } }
    fetch('https://accounts-alpha.tokopedia.com/info', opt).then(response => {
      response.json().then(user => {
        return res.json({
          'name': user['name'],
          'id': user['user_id']
        })
      })
    })
  }
}
