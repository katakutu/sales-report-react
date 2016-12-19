const fetch = require('isomorphic-fetch')
const JSONP = require('node-jsonp')
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
   * @param {boolean} [sameOrigin=false] Is the request comes from same origin?
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consume (url, method, content, sameOrigin = false) {
    let options = (method === 'GET') ? {} : {
      method: method,
      body: JSON.stringify(content)
    }

    let finalOptions = sameOrigin ? Object.assign({}, options, { credentials: 'same-origin' }) : options

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    // return fetch(finalURL, finalOptions).then(response => {
    //   return response.json()
    // })
    return new Promise((resolve, reject) => {
      wrappedTopedFetch(finalURL, finalOptions, (err, response) => {
        if (err) return reject(err)
        resolve(response)
      })
    })
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
   * @param {boolean} [sameOrigin=false] Is the request comes from same origin?
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consumeOAuth (url, method, token, tokenType, content, sameOrigin = false) {
    let options = (method === 'GET') ? {} : {
      body: JSON.stringify(content)
    }

    let optWithAuth = Object.assign({}, options, {
      method: method,
      headers: {
        'Authorization': `${tokenType} ${token}`
      }
    })
    let finalOptions = sameOrigin ? Object.assign({}, optWithAuth, { credentials: 'same-origin' }) : optWithAuth

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    return fetch(finalURL, finalOptions).then(response => {
      return response.json()
    })
  }

  /**
   * Consume an API with JSONP, on specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {object} content The content we want to sent in body.
   * @param {object} jsonpOptions The JSONP options. Available fields: {callback: '', timeout: 4000}
   * @param {boolean} [sameOrigin=false] Is the request comes from same origin?
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consumeJSONP (url, method, content, jsonpOptions, sameOrigin = false) {
    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    let callback = jsonpOptions.callback || 'callback'
    let timeout = jsonpOptions.timeout || 5000
    return new Promise((resolve, reject) => {
      JSONP(finalURL, content, callback, (response) => {
        resolve(response)
      })

      setTimeout(() => {
        reject(new Error(`JSONP request to ${finalURL} timed out after ${timeout}.`))
      }, timeout)
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
   * @param {boolean} [sameOrigin=false] Is the request comes from same origin?
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumeGet (url, content, sameOrigin = false) {
    return this.consume(url, 'GET', content, sameOrigin)
  }

  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body.
   * @param {boolean} [sameOrigin=false] Is the request comes from same origin?
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumePost (url, content, sameOrigin = false) {
    return this.consume(url, 'POST', content, sameOrigin)
  }
}

module.exports = TopedAPI
