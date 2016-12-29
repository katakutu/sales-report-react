const request = require('request-promise')
/*
const obcache = require('obcache')
const redis = require('../../GlobalConfig').SessionRedis

const topedAPICache = obcache.debug.register(new obcache.Create({
  max: 10000,
  maxAge: 30 * 60 * 1000,
  redis: redis,
  id: 2
}), 'topedapi')

const wrappedTopedFetch = topedAPICache.wrap((url, options, cb) => {
  fetch(url, options)
  .then(response => {
    cb(null, response.json())
  })
  .catch(err => {
    cb(err)
  })
})
*/

/**
 * A base class to consume http API without HMAC.
 * Supposed to be composed with other class that will do the real hard work.
 *
 * @class TopedAPI
 */
class TopedAPI {
  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consume (url, method, content) {
    let options = (method === 'GET') ? {} : {
      method: method,
      body: JSON.stringify(content)
    }

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    let finalOptions = Object.assign({}, options, {
      timeout: 5000
    })

    return request(finalURL, finalOptions).then(response => JSON.parse(response))
    /*
    return new Promise((resolve, reject) => {
      wrappedTopedFetch(finalURL, finalOptions, (err, response) => {
        if (err) return reject(err)
        resolve(response)
      })
    })
    */
  }

  /**
   * Consume an OAuth API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {string} token The OAuth Token.
   * @param {string} tokenType The OAuth Token Type.
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consumeOAuth (url, method, token, tokenType, content) {
    let options = (method === 'GET') ? {} : {
      body: JSON.stringify(content),
      json: true
    }

    let finalOptions = Object.assign({}, options, {
      method: method,
      headers: {
        'Authorization': `${tokenType} ${token}`
      },
      timeout: 5000
    })

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    return request(finalURL, finalOptions).then(response => {
      return JSON.parse(response)
    })
  }

  /**
   * Convert an object into URL params
   *
   * @param {object} content The object we want to convert
   * @returns {string} The URL parameters, with associated encoding.
   *
   * @memberOf TopedAPI
   */
  contentToURIParams (content) {
    if (content === undefined || content === null) return ''

    return Object.keys(content).map(key => {
      return key + '=' + encodeURIComponent(content[key])
    }).join('&')
  }

  _formatGetURL (url, content) {
    let result = url.format()
    if (Object.keys(content).length > 0) {
      result = result + '?' + this.contentToURIParams(content)
    }

    return result
  }

  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumeGet (url, content) {
    return this.consume(url, 'GET', content)
  }

  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumePost (url, content) {
    return this.consume(url, 'POST', content)
  }
}

module.exports = TopedAPI
