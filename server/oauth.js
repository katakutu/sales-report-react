"use strict";

const GlobalConfig = require('../GlobalConfig')

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
const oauthAuthorizationURI = oauth2.authorizationCode.authorizeURL({
  redirect_uri: GlobalConfig['Accounts']['Callback'],
  scope: '', state: '123asdf'
})

module.exports = {
    login: function(req, res, next) {
      res.redirect(oauthAuthorizationURI)
    },
    logout: function(req, res, next) {
        res.redirect('/');
    },
    redirect: function(req, res, next) {
      const code = req.query.code
      const options = {code}

      oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
          console.error('Access Token Error', error.message)
          return res.json('Authentication failed.')
        }

        console.log('Resulting token:', result)
        const token = oauth2.accessToken.create(result)

        return res.status(200).json(token)
      })
    },
    userInfo: function(req, res, next) {
         res.json({
            user_id: 12345
         });
    },
};