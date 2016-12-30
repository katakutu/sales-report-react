const bluebird = require('bluebird')
const redis = require('redis')
const uuidV4 = require('uuid/v4')
const CryptoJS = require('crypto-js')
const GlobalConfig = require('./GlobalConfig')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisClient = redis.createClient(
  GlobalConfig['LoginDataRedis']['port'],
  GlobalConfig['LoginDataRedis']['host'],
  { no_ready_check: true }
)

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

function _createUserSession (userInfo, token, callback) {
  _createUserSessionBySID(userInfo, token, _newSessionID(), callback)
}

function _createUserSessionAsync (userInfo, token) {
  return _createUserSessionBySIDAsync(userInfo, token, _newSessionID())
}

function _createUserSessionBySID (userInfo, token, sessionID, callback) {
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
  const key = _redisKey(sessionID)

  return redisClient.set(key, JSON.stringify(sessionData), function (err, reply) {
    if (err) {
      console.error('[Redis] Reply error when saving user session: ', err)
    }

    return callback(err, reply, sessionData)
  })
}

function _createUserSessionBySIDAsync (userInfo, token, sessionID) {
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
  const key = _redisKey(sessionID)

  return redisClient.setAsync(key, JSON.stringify(sessionData))
    .timeout(5000)
    .then(reply => {
      return { reply, sessionData }
    })
    .catch(err => {
      console.error('[Redis] Reply error when saving user session: ', err)

      return { reply: 'ERROR' }
    })
}

function _getSession (sessionID, callback) {
  const key = _redisKey(sessionID)

  return redisClient.get(key, (err, res) => {
    if (err) console.error(`Session Extraction error: ${err}`)

    return callback(res)
  })
}

function _getSessionAsync (sessionID) {
  const key = _redisKey(sessionID)

  return redisClient.getAsync(key)
    .timeout(5000)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(`Session Extraction error: ${err}`)
      return 'ERROR'
    })
}

function _isSessionExists (sessionID, callback) {
  _getSession(sessionID, (res) => callback(res !== null))
}

function _isSessionExistsAsync (sessionID) {
  return _getSessionAsync(sessionID).then(res => res !== null)
}

function _removeUserSession (sessionID, callback) {
  return redisClient.del(_redisKey(sessionID), function (err, reply) {
    let success = true
    if (err) {
      console.error('[Redis] Reply error when deleting user session.', err)
      success = false
    }

    return callback(success)
  })
}

function _removeUserSessionAsync (sessionID) {
  return redisClient.delAsync(_redisKey(sessionID))
    .timeout(5000)
    .then(reply => {
      return true
    })
    .catch(err => {
      console.error('[Redis] Reply error when deleting user session.', err)

      return false
    })
}

module.exports = {
  createUserSession: _createUserSession,
  createUserSessionAsync: _createUserSessionAsync,
  createUserSessionBySID: _createUserSessionBySID,
  createUserSessionBySIDAsync: _createUserSessionBySIDAsync,
  getSession: _getSession,
  getSessionAsync: _getSessionAsync,
  isSessionExists: _isSessionExists,
  isSessionExistsAsync: _isSessionExistsAsync,
  newSessionID: _newSessionID,
  removeUserSession: _removeUserSession,
  removeUserSessionAsync: _removeUserSessionAsync
}
