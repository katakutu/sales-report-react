const redis = require('redis')
const uuidV4 = require('uuid/v4')
const CryptoJS = require('crypto-js')
const GlobalConfig = require('./GlobalConfig')

const redisClient = redis.createClient(GlobalConfig['LoginDataRedis'])

redisClient.on('error', function (err) {
  console.error('[Redis] Redis Client Error: ', err)
})

function _newSessionID () {
  const sessionUUID = uuidV4()
  const sessionTime = Math.floor(Date.now() / 1000)

  return CryptoJS.MD5(`${sessionUUID}${sessionTime}`).toString()
}

function _redisKey (sessionID) {
  return `tkpd:${sessionID}:session_json`
}

function _createUserSession (userInfo, token) {
  const uid = userInfo['user_id']
  const sessionID = _newSessionID()
  const sessionData = {
    'user_email': userInfo['email'],
    'sex': userInfo['gender'],
    'login_type': 1,
    'status': 1,
    'full_name': userInfo['name'],
    'access_token': token,
    'admin_id': uid,
    'id': sessionID
  }

  redisClient.set(_redisKey(sessionID), JSON.stringify(sessionData), function (err, reply) {
    if (err) {
      console.error('[Redis] Reply error when saving user session: ', err)
      return
    }

    console.log(`[Redis] Successfully saved session for user ${uid}. Message: ${reply}`)
  })

  return sessionData
}

function _createUserSessionBySID (userInfo, token, sessionID) {
  const uid = userInfo['user_id']
  const sessionData = {
    'user_email': userInfo['email'],
    'sex': userInfo['gender'],
    'login_type': 1,
    'status': 1,
    'full_name': userInfo['name'],
    'access_token': token,
    'admin_id': uid,
    'id': sessionID
  }

  redisClient.set(_redisKey(sessionID), JSON.stringify(sessionData), function (err, reply) {
    if (err) {
      console.error('[Redis] Reply error when saving user session: ', err)
      return
    }

    console.log(`[Redis] Successfully saved session for user ${uid}. Message: ${reply}`)
  })

  return sessionData
}

function _getSession (sessionID, callback) {
  const key = _redisKey(sessionID)

  redisClient.get(key, (err, res) => {
    if (err) console.log(`Session Extraction error: ${err}`)

    console.log(`[Redis] Session ID ${key} found`)
    callback(res)
  })
}

function _isSessionExists (sessionID, callback) {
  _getSession(sessionID, (res) => callback(res !== null))
}

function _removeUserSession (sessionID) {
  return redisClient.del(_redisKey(sessionID), function (err, reply) {
    if (err) {
      console.error('[Redis] Reply error when deleting user session.', err)
      return false
    }

    console.log('[Redis] Successfully deleted user session.')
    return true
  })
}

module.exports = {
  createUserSession: _createUserSession,
  createUserSessionBySID: _createUserSessionBySID,
  getSession: _getSession,
  isSessionExists: _isSessionExists,
  newSessionID: _newSessionID,
  removeUserSession: _removeUserSession
}
